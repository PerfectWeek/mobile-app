import {takeEvery, put, select} from "redux-saga/effects";
import {ShowErrorNotification} from "../../Utils/NotificationsModals";
import {arrayToObject} from "../../Utils/utils";
import {EventsActionType, SetEvent, SetEvents, SetLoading, SetLoadingJoining} from "./events.actions";
import {SetEvent as SetCalendarEvent} from "../Calendar/calendar.actions";
import {CalendarService} from "../../Services/Calendar/calendar";
import {
    CalendarActionType,
    GetCalendars,
    GetCalendarsSuccess,
    GetEventInfoSuccess,
    GetEventsSuccess
} from "../Calendar/calendar.actions";
import {Network} from "../../Network/Requests";


function* GetEventRecommendation({min_time, max_time, limit}) {
    try {
        yield put(SetLoading(true));
        let calendars = yield select((state) => {
            return state.calendar.calendars
        });
        if (calendars === undefined || calendars.length === 0) {

            const pseudo = yield select((state) => {
                return state.login.pseudo
            });
            const resp = yield Network.Get(`/users/${pseudo}/calendars`);
            if (resp.status !== 200)
                throw resp.data;
            calendars = resp.data.calendars.map(c => {
                return {...c.calendar, show: true}
            });
            yield put(GetCalendarsSuccess(calendars));

        }
        const mainCalendar = calendars.find(c => {
            return c.name === 'Main calendar' || c.name === 'Main Calendar'
        });
        let events = yield CalendarService.GetEventsSuggestion(mainCalendar.id, min_time, max_time, limit);
        events = yield CalendarService.GetEventsImage(events);
        events = yield CalendarService.GetEventsAttendees(events);

        yield put(SetEvents(events));
        yield put(SetLoading(false));

    } catch (err) {
        yield ShowErrorNotification(err);
    }
}

function* JoinEvent({event, status}) {
    try {
        yield put(SetLoadingJoining(true));
        yield CalendarService.JoinEvent(event.id, status);
        const pseudo = yield select((state) => {
            return state.login.pseudo
        });
        event.attendees.push({pseudo, status: 'going'});
        yield put(SetEvent(event));
        yield put(SetCalendarEvent({...event, status: status}));
        yield put(SetLoadingJoining(false));
    } catch (err) {
        yield ShowErrorNotification(err);
    }
}

function* ChangeEventStatus({event, status}) {
    try {
        yield put(SetLoadingJoining(true));
        yield CalendarService.ChangeEventStatus(event.id, status);
        const pseudo = yield select((state) => {
            return state.login.pseudo
        });
        event.attendees.find(a => a.pseudo === pseudo).status = status;
        yield put(SetEvent(event));
        yield put(SetCalendarEvent({...event, status: status}));
        yield put(SetLoadingJoining(false));
    } catch (err) {
        yield ShowErrorNotification(err);
    }
}


export function* EventsSaga() {
    yield takeEvery(EventsActionType.GetEventRecommendation, GetEventRecommendation);
    yield takeEvery(EventsActionType.JoinEvent, JoinEvent);
    yield takeEvery(EventsActionType.ChangeEventStatus, ChangeEventStatus);
}
