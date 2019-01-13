import {CalendarActionType,
    GetAllUsersEventsSuccess,
    GetAllUsersEventsFail,
    CreateNewEventSuccess,
    RefreshCalendar,
    GetEventInfoSuccess,
    GetEventInfoFail,
    ModifyEventSuccess,
    ModifyEventFail
} from "../Calendar/calendar.actions";
import {takeEvery, put} from "redux-saga/effects";
import {Network} from "../../Network/Requests";
import {Toast} from "native-base";

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
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
        yield put(GetEventInfoFail());
    }
    yield put(GetEventInfoSuccess(response.data.event));
}

function* ModifyEvent(action) {
    console.log('modify', action)
    const response = yield Network.Put('/events/' + action.event.id, {
        name: action.event.eventName,
        description: action.event.description,
        start_time: action.event.dateBeginEvent + "T" + action.event.beginTime,
        end_time: action.event.dateEndEvent + "T" + action.event.endTime,
        location: action.event.localisation
    });

    if (response.status === 200) {
        yield Toast.show({
            text: "Event Modified.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
        yield put(ModifyEventSuccess());
    }
    else {
        let err;
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
        yield put(ModifyEventFail());

    }
}

function* DeleteEvent(action) {
    const response = yield Network.Delete('/events/' + action.event);

    if (response.status === 200) {
        yield Toast.show({
            text: "Event Deleted.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
    }
    else {
        let err;
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
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
        yield Toast.show({
            text: "Event Created.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
        yield put(CreateNewEventSuccess());
    }
    else {
        let err;
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield put(CreateNewEventFail(err));
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
    }
}

function* GetAllUsersEvents(action) {
    console.log('GETTER')
    try {
      let listEventsByCalendars = [];
      const resp = yield Network.Get('/users/'+ action.pseudo.pseudo +'/calendars');
      if (resp.status !== 200)
         throw resp.data;
      const listCalendars = resp.data.calendars;
      for (let idx = 0; idx < listCalendars.length; idx++) {
         const item = listCalendars[idx].calendar;

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
   yield takeEvery(CalendarActionType.GetAllUsersEvents, GetAllUsersEvents);
   yield takeEvery(CalendarActionType.ModifyEvent, ModifyEvent);
   yield takeEvery(CalendarActionType.GetEventInfo, GetTheEventInfo);
   yield takeEvery(CalendarActionType.CreateNewEvent, CreatNewEvent);
   yield takeEvery(CalendarActionType.DeleteEvent, DeleteEvent);
}
