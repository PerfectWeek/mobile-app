import {put, takeEvery} from "redux-saga/effects";
import {AutoCompletionType, AskCompletionFail, AskCompletionSuccess} from "./autocompletion.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions} from 'react-navigation'
import {Toast} from "native-base";
import {LoginFail} from "../Login/login.actions";

function* AskCompletionPseudo(action) {
    // console.log("ASK", "search/users?q="+action.searchPseudo);
    try {
        const response = yield Network.Get("search/users?q="+action.searchPseudo);
        if (response.status !== 200)
            throw response;
        let list = [];
        yield put(AskCompletionSuccess(response.data.users))
    }
    catch (e) {
        let err;
        if (e.data !== undefined && e.data.message !== undefined)
            err = e.data.message;
        else
            err = "Connection error";
        yield put(AskCompletionFail());
        Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
    }
}

export function* AutoCompletionSaga() {
    yield takeEvery(AutoCompletionType.AskCompletion, AskCompletionPseudo);
}
