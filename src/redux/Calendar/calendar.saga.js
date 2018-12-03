import {CalendarActionType} from "../Calendar/calendar.actions";
import {takeEvery} from "redux-saga/effects";

function* Nothing(action) {

}

export function* CalendarSaga() {
   yield takeEvery(CalendarActionType.Nothing, () =>{})
}
