import {takeEvery, put, select} from "redux-saga/effects";
import {ShowErrorNotification} from "../../Utils/NotificationsModals";
import {arrayToObject} from "../../Utils/utils";
import {EventsActionType, SetEvent, SetEvents, SetLoading, SetLoadingJoining} from "./events.actions";
import {SetEvent as SetCalendarEvent, DeleteEventSuccess, RefreshCalendar} from "../Calendar/calendar.actions";
import {CalendarService} from "../../Services/Calendar/calendar";
import {
    CalendarActionType,
    GetCalendars,
    GetCalendarsSuccess,
    GetEventInfoSuccess,
    GetEventsSuccess
} from "../Calendar/calendar.actions";
import {Network} from "../../Network/Requests";
import axios from 'react-native-axios'
const uuidv4 = require('uuid/v4');


function* GetEventRecommendation({min_time, max_time, limit}) {
    try {
        yield put(SetLoading(true));

        let events = yield CalendarService.GetEventsSuggestion(min_time, max_time, limit);
        
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
        const id = yield select((state) => {
            return state.login.id
        });
        event.attendees.push({name : pseudo, status: 'going', id, image: `${axios.defaults.baseURL}/users/${id}/images/profile?rand=${uuidv4()}`});
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
        const id = yield select((state) => {
            return state.login.id
        });
        event.attendees.find(a => a.id === id).status = status;
        yield put(SetEvent(event));
        if (status === "no") {
            yield put(DeleteEventSuccess(event.id));
            yield put(RefreshCalendar());
        }
        else {
            yield put(SetCalendarEvent({...event, status: status}));
        }
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
