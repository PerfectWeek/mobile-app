import {put, takeEvery} from "redux-saga/effects";
import {AutoCompletionType, AskCompletion, AskCompletionFail, AskCompletionSuccess} from "./autocompletion.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions} from 'react-navigation'
import {Toast} from "native-base";

function* AskCompletionPseudo(action) {
    console.log("ASK", action)
}

export function* AutoCompletionSaga() {
    yield takeEvery(AutoCompletionType.AskCompletion, AskCompletionPseudo);
}