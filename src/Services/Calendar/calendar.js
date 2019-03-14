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
}