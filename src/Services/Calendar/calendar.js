import {Network} from "../../Network/Requests";

export class CalendarService {

    static async GetCalendarsForUser(pseudo) {
        const resp = await Network.Get('/users/' + pseudo + '/calendars');
        if (resp.status === 200)
            return resp.data.calendars;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async GetEventsSuggestion(calendarId, min_time, max_time, limit) {
        const resp = await Network.Get(`/calendars/${calendarId}/assistant/get-event-suggestions`,
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
        for (let idx = 0; idx < calendars.length; idx++) {
            const resp = await Network.Get('/calendars/' + calendars[idx].id + '/events');
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
        }
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
            const resp = await Network.Get('/events/' + events[idx].id + '/image');
            if (resp.status === 200) {
                events[idx].image = resp.data.image;
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

    static async GetEventsAttendees(events) {
        for (let idx = 0; idx < events.length; idx++) {
            const resp = await Network.Get('/events/' + events[idx].id + '/attendees');
            if (resp.status === 200) {
                events[idx].attendees = resp.data.attendees;
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

    static async JoinEvent(event_id, status) {
        const resp = await Network.Post(`/events/${event_id}/join`, {status});
        if (resp.status === 200)
            return "ok";
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async ChangeEventStatus(event_id, status) {
        const resp = await Network.Put(`/events/${event_id}/status`, {status});
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
