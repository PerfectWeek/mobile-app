import {takeEvery, put, select} from "redux-saga/effects";
import {ShowErrorNotification} from "../../Utils/NotificationsModals";
import {arrayToObject} from "../../Utils/utils";
import {EventsActionType, SetEvents, SetLoading} from "./events.actions";
import {CalendarService} from "../../Services/Calendar/calendar";
import {GetCalendars, GetCalendarsSuccess} from "../Calendar/calendar.actions";
import {Network} from "../../Network/Requests";


function* GetEventRecommendation({min_time, max_time, limit}) {
    try {
        yield put(SetLoading(true));
        let calendars = yield select((state) => {
            return state.calendar.calendars
        });
        if (calendars === undefined) {

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
            return c.name === 'Main calendar'
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

export function* EventsSaga() {
    yield takeEvery(EventsActionType.GetEventRecommendation, GetEventRecommendation);
}
