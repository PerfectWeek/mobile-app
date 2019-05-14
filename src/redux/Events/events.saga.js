import {takeEvery, put} from "redux-saga/effects";
import {ShowErrorNotification} from "../../Utils/NotificationsModals";
import {arrayToObject} from "../../Utils/utils";


// function* LoadCalendar(action) {
//     try {
//         let calendars = yield CalendarService.GetCalendarsForUser(action.pseudo);
//         calendars = calendars.map(c => {
//             return {...c.calendar, show: true}
//         });
//         let events_array = yield CalendarService.GetEventsForCalendars(calendars);
//         events_array = yield CalendarService.GetEventsInfo(events_array);
//         yield put(GetCalendarsSuccess(calendars));
//         let events = arrayToObject(events_array, 'id');
//         yield put(GetEventsSuccess(events));
//         yield put(LoadCalendarSuccess());
//         events_array = yield CalendarService.GetEventsImage(events_array);
//         yield put(GetEventsSuccess(arrayToObject(events_array, 'id')));
//     } catch (err) {
//         yield ShowErrorNotification(err);
//         yield put(LoadCalendarFail(err));
//     }
// }

export function* EventsSaga() {
    // yield takeEvery(CalendarActionType.DeleteEvent, DeleteEvent);
}
