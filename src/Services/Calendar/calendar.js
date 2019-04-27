import {Network} from "../../Network/Requests";

export class CalendarService {

    static async GetCalendarsForUser(pseudo) {
        const resp = await Network.Get('/users/me');
        // if (resp.status === 200)
        return resp.calendars;
        // let err;
        // if (resp.data !== undefined && resp.data.message !== undefined)
        //     err = resp.data.message;
        // else
        //     err = "Connection error";
        // throw err;
    }

    static async GetEventsForCalendars(calendars) {
        let events = [];
        for (let idx = 0; idx < calendars.length; idx++) {
            const resp = await Network.Get('/calendars/' + calendars[idx].id);
            // if (resp.status === 200) {
            events.push(...resp.events);
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

    static async GetEventsInfo(events) {
        for (let idx = 0; idx < events.length; idx++) {
            const resp = await Network.Get('/events/' + events[idx].id);
            // if (resp.status === 200) {
            events[idx] = {...events[idx], ...resp};
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

    static async GetEventsImage(events) {
        for (let idx = 0; idx < events.length; idx++) {
            console.log(events[idx].id)
            const resp = await Network.Get('/upload/files/' + events[idx].id);
            console.log('tim',resp)
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