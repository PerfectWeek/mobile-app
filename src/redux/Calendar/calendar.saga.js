import {
    CalendarActionType,
    GetAllUsersEventsSuccess,
    GetAllUsersEventsFail,
    CreateNewEventSuccess,
    RefreshCalendar,
    GetEventInfoSuccess,
    GetEventInfoFail,
    ModifyEventSuccess,
    ModifyEventFail,
    DeleteEventFail,
    DeleteEventSuccess,
    GetBestSlotsFail,
    GetBestSlotsSuccess,
    SetEvent as SetCalendarEvent
} from "../Calendar/calendar.actions";
import { takeEvery, put, select } from "redux-saga/effects";
import { Network } from "../../Network/Requests";
import {
    CreateNewEventFail, GetCalendarsFail,
    GetCalendarsSuccess, GetEventsSuccess,
    GetUsersEventsFilteredFail,
    GetUsersEventsFilteredSuccess, LoadCalendarFail, LoadCalendarSuccess
} from "./calendar.actions";
import { ShowErrorNotification, ShowSuccessNotification } from "../../Utils/NotificationsModals";
import { arrayToObject } from "../../Utils/utils";
import { CalendarService } from "../../Services/Calendar/calendar";
import { GetEventRecommendation, SetEvent } from "../Events/events.actions";
import * as Localization from 'expo-localization';


function* GetTheEventInfo(action) {
    let listAttendees = [];
    const response = yield Network.Get('/events/' + action.event);
    // const respons2 = yield Network.Get('/events/' + action.event + '/attendees');
    if (response.status !== 200) {
        let err;
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield ShowErrorNotification(err);
        yield put(GetEventInfoFail());
    }
    // console.log('resp', response.data)
    // for (let i = 0; i < respons2.data.attendees.length; i++) {
        // listAttendees.push(respons2.data.attendees[i]['pseudo'])
    // }
    yield put(GetEventInfoSuccess(response.data.event));
}

const fr_to_en = {
    Soirée: 'party',
    Travail: 'work',
    Sport: 'workout',
    Hobby: 'hobby'
};


function* ModifyEvent(action) {

    if (Localization.locale === 'fr-FR') {

        action.event.type = fr_to_en[action.event.type]
    }

    if (action.event.attendeesToAdd.length !== 0) {
        let users = [];
        action.event.attendeesToAdd.forEach((user) => {
            users.push( {
                id: user.id,
                role: "actor"
            })
        });
            yield Network.Post('/events/' + action.event.id + '/attendees', {
                attendees: users
        });
    }


    const response = yield Network.Put('/events/' + action.event.id, {
        name: action.event.EventTitle,
        description: action.event.description,
        start_time: action.event.dateBeginEvent + "T" + action.event.beginTime,
        end_time: action.event.dateEndEvent + "T" + action.event.endTime,
        location: action.event.localisation,
        type: action.event.type,
        visibility: action.event.visibility,
        color: action.event.color
    });

    if (response.status === 200) {
        var modified_event = response.data.event;
        yield ShowSuccessNotification("Event Modified");
        yield put(ModifyEventSuccess(modified_event));
    } else {
        let err;
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield ShowErrorNotification(err);
        yield put(ModifyEventFail());
    }

    if (response.status === 200 && action.event.new_image) {
        const data = new FormData();
        data.append('image', {
            uri: action.event.image.uri,
            type: 'image/jpeg', // or photo.type
            name: 'EventPicture'
        });
        const resp = yield Network.PutMultiPart('/events/' + action.event.id + '/images/icon', data);
        if (resp.status === 200) {
            modified_event.image = action.event.image.uri;
            yield put(ModifyEventSuccess(modified_event));
        } else {
            let err;
            if (resp.status !== 500 && resp.data !== undefined && resp.data.message !== undefined)
                err = resp.data.message;
            else
                err = "Connection error";
            yield ShowErrorNotification(err);
            yield put(ModifyEventFail());
        }
    }
}

function* DeleteEvent(action) {
    const response = yield Network.Delete('/events/' + action.eventId);

    if (response.status === 200) {
        yield ShowSuccessNotification("Event Deleted");
        yield put(DeleteEventSuccess(action.eventId));
    } else {
        let err;
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield ShowErrorNotification(err);
        yield put(DeleteEventFail());
    }
    yield put(RefreshCalendar());
}


function* CreatNewEvent(action) {
    if (Localization.locale === 'fr-FR'  && Object.keys(fr_to_en).find(t => t === action.event.type) !== undefined) {
        action.event.type = fr_to_en[action.event.type]
    }
    try {
        let data = {
            name: action.event.EventTitle,
            description: action.event.description,
            start_time: action.event.dateBeginEvent + "T" + action.event.beginTime,
            end_time: action.event.dateEndEvent + "T" + action.event.endTime,
            location: action.event.localisation,
            type: action.event.type,
            visibility: action.event.visibility,
            color: action.event.color
        }
        if (action.event.calendarId !== -1)
            data.calendar_id = action.event.calendarId;

        const response = yield Network.Post('/events', data);
        if (response.status !== 201)
            throw response;
        const events = yield CalendarService.GetEventsInfo([response.data.event]);

        const events_w_image = yield CalendarService.GetEventsImage([events[0]]);
        if (action.event.usersToAdd !== undefined && action.event.usersToAdd.length !== 0) {
            const responseAddUsers = yield Network.Post('/events/' + events[0].id + '/attendees', {
                'attendees': action.event.usersToAdd.map(u => { return { ...u, role: 'actor'}})
            });

            if (responseAddUsers.status !== 200) {
                yield Network.Delete('/events/' + events[0].id);
                throw responseAddUsers
            }
        }
        events_w_image[0].role = 'admin';
        yield put(CreateNewEventSuccess(events_w_image[0]));
        yield ShowSuccessNotification("Event Created");
    } catch (err) {
        if (err.status !== 500 && err.data !== undefined && err.data.message !== undefined)
            err = err.data.message;
        else
            err = "Connection error";
        yield put(CreateNewEventFail(err));
        yield ShowErrorNotification(err);
    }
}

function* GetCalendars(action) {
    try {
        const pseudo = yield select((state) => {
            return state.login.pseudo
        });
        const resp = yield Network.Get(`/calendars`);
        if (resp.status !== 200)
            throw resp.data;

        const calendars = resp.data.calendars.map(c => {
            return { ...c, show: false }
        });
        yield put(GetCalendarsSuccess(calendars));
    } catch (e) {
        let err;
        if (e !== undefined && e.message !== undefined)
            err = e.message;
        else
            err = "Connection error";
        yield put(GetCalendarsFail(err));
        yield ShowErrorNotification(err);
    }
}

function* ReloadEvents(action) {
    try {
        const filtered_calendars = action.calendars.filter(c => c.show);
        let events_array = yield CalendarService.GetEventsForCalendars(filtered_calendars);
        // events_array = yield CalendarService.GetEventsInfo(events_array);
        let events = arrayToObject(events_array, 'id');
        yield put(GetEventsSuccess(events));
        yield put(LoadCalendarSuccess());
        events_array = yield CalendarService.GetEventsImage(events_array);
        yield put(GetEventsSuccess(arrayToObject(events_array, 'id')));
    } catch (err) {
        yield ShowErrorNotification(err);
        yield put(LoadCalendarFail(err));
    }
}

function* LoadCalendar(action) {
    try {
        yield GetCalendars();
        let calendars = yield select((state) => {
            return state.calendar.calendars
        });
        const filtered_calendars = calendars.filter(c => c.show);

        let events_array = yield CalendarService.GetEventsForCalendars(filtered_calendars);

        // events_array = yield CalendarService.GetEventsInfo(events_array);
        let events = arrayToObject(events_array, 'id');
        yield put(GetEventsSuccess(events));
        yield put(LoadCalendarSuccess());
        events_array = yield CalendarService.GetEventsImage(events_array);
        yield put(GetEventsSuccess(arrayToObject(events_array, 'id')));
    } catch (err) {
        yield ShowErrorNotification(err);
        yield put(LoadCalendarFail(err));
    }
}

function* GetBestSlots(action) {
    try {
        const resp = yield CalendarService.GetBestSlots({
            calendarId: action.infos.calendarId,
            duration: action.infos.timeEvent,
            location: action.infos.localisation,
            min_time: action.infos.dateBeginEvent + "T" + action.infos.beginTime,
            max_time: action.infos.dateEndEvent + "T" + action.infos.endTime,
            type: action.infos.type
        });
        if (resp.status !== 200)
            throw resp.data;
        const slots = resp.data.slots.map(c => {
            return {
                ...c,
                show: true,
                slot: true,
                name: action.infos.EventTitle,
                description: action.infos.description,
                location: action.infos.localisation,
                type: action.infos.type
            }
        });
        // console.log(slots)
        // name: action.event.EventTitle,
        // description: action.event.description,
        if (slots.length === 0)
            throw { message: 'No slots found' };
        yield put(GetBestSlotsSuccess(slots));
    } catch (e) {
        // console.log(e)
        let err;
        if (e !== undefined && e.message !== undefined)
            err = e.message;
        else
            err = "Connection error";
        yield put(GetBestSlotsFail(err));
        yield ShowErrorNotification(err);
    }
}

function* ChangeCalendarEventStatus({ event, status }) {
    try {
        // yield put(SetLoading(true));
        yield CalendarService.ChangeEventStatus(event.id, status);
        // yield put(LoadCalendar());

        var b = new Date();
        b.setDate(b.getDate());
        let beg = b.toISOString().split('.')[0]
        var e = new Date();
        e.setDate(e.getDate() + 20);
        let end = e.toISOString().split('.')[0]

        yield put(GetEventRecommendation(beg, end, 10));
        yield LoadCalendar();
    } catch (err) {
        yield ShowErrorNotification(err);
    }
}

export function* CalendarSaga() {
    yield takeEvery(CalendarActionType.ReloadEvents, ReloadEvents);
    yield takeEvery(CalendarActionType.GetBestSlots, GetBestSlots);
    yield takeEvery(CalendarActionType.LoadCalendar, LoadCalendar);
    yield takeEvery(CalendarActionType.GetCalendars, GetCalendars);
    yield takeEvery(CalendarActionType.ModifyEvent, ModifyEvent);
    yield takeEvery(CalendarActionType.GetEventInfo, GetTheEventInfo);
    yield takeEvery(CalendarActionType.CreateNewEvent, CreatNewEvent);
    yield takeEvery(CalendarActionType.DeleteEvent, DeleteEvent);
    yield takeEvery(CalendarActionType.ChangeCalendarEventStatus, ChangeCalendarEventStatus);
}
