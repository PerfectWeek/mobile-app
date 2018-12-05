import {CalendarActionType, GetAllUsersEventsSuccess, GetAllUsersEventsFail} from "../Calendar/calendar.actions";
import {takeEvery, put} from "redux-saga/effects";
import {Network} from "../../Network/Requests";
import {Toast} from "native-base";

function getEvents() {
   return Network.Get('/users/{pseudo}/calendars')
}

function* GetAllUsersEvents(action) {
   try {
      let listEventsByCalendars = [];
      const resp = yield Network.Get('/users/'+ action.pseudo +'/calendars');
      if (resp.status !== 200)
         throw resp.data;
      const listCalendars = resp.data.calendars;
      for (let idx = 0; idx < listCalendars.length; idx++) {
         const item = listCalendars[idx].calendar;
          // console.log(listCalendars[idx].calendar)

          const listEvents = yield Network.Get('/calendars/'+ item.id +'/events');
         if (resp.status !== 200) {
             throw resp.data;
         }

          listEventsByCalendars.push({
           calendarId: item.id,
           calendarName: item.name,
           events: listEvents.data.events
         })
      }
      yield put(GetAllUsersEventsSuccess(listEventsByCalendars));
   }
   catch (e) {
       let err;
       if (e !== undefined && e.message !== undefined)
           err = e.message;
       else
           err = "Connection error";
       yield put(GetAllUsersEventsFail(err));
       Toast.show({
           text: err,
           type: "danger",
           buttonText: "Okay",
           duration: 5000
       });
   }

   // const resp = yield Network.Get('')
}

export function* CalendarSaga() {
   yield takeEvery(CalendarActionType.GetAllUsersEvents, GetAllUsersEvents)
}
