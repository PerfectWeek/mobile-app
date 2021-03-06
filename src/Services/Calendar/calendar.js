import {Network} from "../../Network/Requests";
import {UserService} from "../Users/users";
import axios from 'react-native-axios'
const uuidv4 = require('uuid/v4');

export class CalendarService {

    static async GetBestSlots(infos) {
        const resp = await Network.Get(encodeURI('/assistant/find-best-slots/' + infos.calendarId  +
            '?duration='+infos.duration+
            '&location='+infos.location+
            '&max_time='+infos.max_time+
            '&min_time='+infos.min_time+
            '&type='+infos.type));
        return resp;
    }

    static async GetCalendarsForUser(pseudo) {
        const resp = await Network.Get('/calendars');
        if (resp.status === 200)
            return resp.data.calendars;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async GetEventsSuggestion(min_time, max_time, limit) {
        const resp = await Network.Get(`/assistant/event-suggestions`,
            {min_time, max_time, limit});
        if (resp.status === 200)
            return resp.data.suggestions.map(s => s.event);

        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async GetEventsForCalendars(calendars) {
        let events = [];
        // for (let idx = 0; idx < calendars.length; idx++) {
            if (calendars.length === 0) {

                var resp = await Network.Get('/events/', 
                    {'only_statuses[]' : 'going'}
                );
            }
            else {
                var resp = await Network.Get('/events/', {
                    'only_calendar_ids[]' : calendars.map(c => c.id),
                    'only_statuses[]' : 'going'
                });
            }

            if (resp.status === 200) {
            events.push(...resp.data.events);
        } else {
            let err;
            if (resp.data !== undefined && resp.data.message !== undefined)
                err = resp.data.message;
            else
                err = "Connection error";
            throw err
        }
        // }
        return events
    }

    static async GetEventsInfo(events) {
        for (let idx = 0; idx < events.length; idx++) {
            const resp = await Network.Get('/events/' + events[idx].id);
            if (resp.status === 200) {
                events[idx] = {...events[idx], ...resp.data.event};
            } else {
                let err;
                if (resp.data !== undefined && resp.data.message !== undefined)
                    err = resp.data.message;
                else
                    err = "Connection error";
                throw err
            }
        }
        return events
    }

    static async GetEventsImage(events) {
        for (let idx = 0; idx < events.length; idx++) {
            events[idx].image = `${axios.defaults.baseURL}/events/${events[idx].id}/images/icon?rand=${uuidv4()}`;
            // const resp = await Network.Get(`/events/${events[idx].id}/images/icon`);
            // if (resp.status === 200) {
            //     events[idx].image = resp.data;
                
            // } else {
            //     let err;
            //     if (resp.data !== undefined && resp.data.message !== undefined)
            //         err = resp.data.message;
            //     else
            //         err = "Connection error";
            //     throw err
            // }
        }
        return events
    }

    // static async GetEventsImage(events) {
    //     for (let idx = 0; idx < events.length; idx++) {
    //         const resp = await Network.Get(`/events/${events[idx].id}/images/icon`);
    //         if (resp.status === 200) {
    //             events[idx].image = resp.data;
                
    //         } else {
    //             let err;
    //             if (resp.data !== undefined && resp.data.message !== undefined)
    //                 err = resp.data.message;
    //             else
    //                 err = "Connection error";
    //             throw err
    //         }
    //     }
    //     return events
    // }

    static async GetEventsAttendees(events) {
        for (let idx = 0; idx < events.length; idx++) {
            const resp = await Network.Get(`/events/${events[idx].id}`);
            if (resp.status === 200) {
                events[idx].attendees = resp.data.event.attendees;

                events[idx].attendees = await UserService.GetUsersImage(events[idx].attendees);
            }
        }
            //  else {
            //     let err;
            //     if (resp.data !== undefined && resp.data.message !== undefined)
            //         err = resp.data.message;
            //     else
            //         err = "Connection error";
            //     throw err
            // }
        // }
        return events
    }

    static async JoinEvent(event_id, status) { // TODO
        const resp = await Network.Put(`/events/${event_id}/attendees/me/status`, {status});
        if (resp.status === 200)
            return "ok";
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error: Join event";
        throw err;
    }

    static async ChangeEventStatus(event_id, status) { // TODO
        const resp = await Network.Put(`/events/${event_id}/attendees/me/status`, {status});
        if (resp.status === 200)
            return "ok";
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }
}
