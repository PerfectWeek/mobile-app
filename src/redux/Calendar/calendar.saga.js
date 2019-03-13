import {
    CalendarActionType,
    GetAllUsersEventsSuccess,
    GetAllUsersEventsFail,
    CreateNewEventSuccess,
    RefreshCalendar,
    GetEventInfoSuccess,
    GetEventInfoFail,
    ModifyEventSuccess,
    ModifyEventFail, DeleteEventFail, DeleteEventSuccess
} from "../Calendar/calendar.actions";
import {takeEvery, put} from "redux-saga/effects";
import {Network} from "../../Network/Requests";
import {
    CreateNewEventFail, GetCalendarsFail,
    GetCalendarsSuccess, GetEventsFail, GetEventsSuccess,
    GetUsersEventsFilteredFail,
    GetUsersEventsFilteredSuccess, LoadCalendarFail, LoadCalendarSuccess
} from "./calendar.actions";
import {ShowErrorNotification, ShowSuccessNotification} from "../../Utils/NotificationsModals";
import {GroupService} from "../../Services/Groups/groups";
import {UserService} from "../../Services/Users/users";
import {arrayToObject} from "../../Utils/utils";
import {GetGroupInfoFail, GetGroupInfoSuccess, GetGroupMembersSuccess} from "../Groups/groups.actions";
import {CalendarService} from "../../Services/Calendar/calendar";

function getEvents() {
    return Network.Get('/users/{pseudo}/calendars')
}

function* GetTheEventInfo(action) {
    const response = yield Network.Get('/events/' + action.event);

    if (response.status !== 200) {
        let err;
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield ShowErrorNotification(err);
        yield put(GetEventInfoFail());
    }
    yield put(GetEventInfoSuccess(response.data.event));
}

function* ModifyEvent(action) {
    const response = yield Network.Put('/events/' + action.event.id, {
        name: action.event.EventTitle,
        description: action.event.description,
        start_time: action.event.dateBeginEvent + "T" + action.event.beginTime,
        end_time: action.event.dateEndEvent + "T" + action.event.endTime,
        location: action.event.localisation
    });

    if (response.status === 200) {
        yield ShowSuccessNotification("Event Modified");
        yield put(ModifyEventSuccess());
    } else {
        let err;
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield ShowErrorNotification(err);
        yield put(ModifyEventFail());

    }
}

function* DeleteEvent(action) {
    const response = yield Network.Delete('/events/' + action.event);

    if (response.status === 200) {
        yield ShowSuccessNotification("Event Deleted");
        yield put(DeleteEventSuccess());
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
    const response = yield Network.Post('/calendars/' + action.event.calendarId + '/events', {
        name: action.event.EventTitle,
        description: action.event.description,
        start_time: action.event.dateBeginEvent + "T" + action.event.beginTime,
        end_time: action.event.dateEndEvent + "T" + action.event.endTime,
        location: action.event.localisation
    });

    if (response.status === 201) {
        yield ShowSuccessNotification("Event Created");
        yield put(CreateNewEventSuccess());
    } else {
        let err;
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield put(CreateNewEventFail(err));
        yield ShowErrorNotification(err);
    }
}

function* GetCalendars(action) {
    try {
        const resp = yield Network.Get('/users/' + action.pseudo.pseudo + '/calendars');
        if (resp.status !== 200)
            throw resp.data;
        const calendars = resp.data.calendars.map(c => {
            return {...c.calendar, show: true}
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

function* GetEvents(action) {
    try {
        let events = [];

        const listCalendars = action.calendars;
        for (let idx = 0; idx < listCalendars.length; idx++) {
            const item = listCalendars[idx];
            if (item.show) {
                const listEvents = yield Network.Get('/calendars/' + item.id + '/events');
                if (listEvents.status !== 200) {
                    throw listEvents;
                }
                events.push(
                    ...listEvents.data.events
                );
            }
        }
        yield put(GetEventsSuccess(events));
    } catch (e) {
        let err;
        if (e !== undefined && e.message !== undefined)
            err = e.message;
        else
            err = "Connection error";
        yield put(GetEventsFail(err));
        yield ShowErrorNotification(err);
    }
}

function* ReloadEvents(action) {
    try {
        const filtered_calendars = action.calendars.filter(c => c.show);
        let events = yield CalendarService.GetEventsForCalendars(filtered_calendars);
        events = yield CalendarService.GetEventsInfo(events);
        yield put(GetEventsSuccess(events));
        yield put(LoadCalendarSuccess());
    } catch (err) {
        yield ShowErrorNotification(err);
        yield put(LoadCalendarFail(err));
    }
}

function* LoadCalendar(action) {
    try {
        let calendars = yield CalendarService.GetCalendarsForUser(action.pseudo);
        calendars = calendars.map(c => {
            return {...c.calendar, show: true}
        });
        let events = yield CalendarService.GetEventsForCalendars(calendars);
        events = yield CalendarService.GetEventsInfo(events);
        yield put(GetCalendarsSuccess(calendars));
        yield put(GetEventsSuccess(events));
        yield put(LoadCalendarSuccess());
    } catch (err) {
        yield ShowErrorNotification(err);
        yield put(LoadCalendarFail(err));
    }
}

export function* CalendarSaga() {
    yield takeEvery(CalendarActionType.ReloadEvents, ReloadEvents);
    yield takeEvery(CalendarActionType.LoadCalendar, LoadCalendar);
    yield takeEvery(CalendarActionType.GetEvents, GetEvents);
    yield takeEvery(CalendarActionType.GetCalendars, GetCalendars);
    yield takeEvery(CalendarActionType.ModifyEvent, ModifyEvent);
    yield takeEvery(CalendarActionType.GetEventInfo, GetTheEventInfo);
    yield takeEvery(CalendarActionType.CreateNewEvent, CreatNewEvent);
    yield takeEvery(CalendarActionType.DeleteEvent, DeleteEvent);
}
