import {put, takeEvery} from "redux-saga/effects";
import {GetInfoFail, GetInfoSuccess, UserActionsType} from "./user.actions";
import {Network} from "../../Network/Requests";

function _get_user_info(pseudo) {
    return Network.Get('/users/' + pseudo);
}

function* GetUserInfo(action) {
    const response = yield _get_user_info(action.pseudo);
    if (response.status === 200) {
        yield put(GetInfoSuccess(response.data.user));
    }
    else {
        console.log(response);
        if (response.data !== undefined && response.data.message !== undefined)
            yield put(GetInfoFail(response.data.message));
        else
            yield put(GetInfoFail("Connection error"));
    }
}

export function* UserSagas() {
    yield takeEvery(UserActionsType.GetInfo, GetUserInfo);
}