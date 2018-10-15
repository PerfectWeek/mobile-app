import {put, takeEvery} from "redux-saga/effects";
import {GetInfoFail, GetInfoSuccess, UpdateInfoFail, UpdateInfoSuccess, UserActionsType} from "./user.actions";
import {Network} from "../../Network/Requests";
import {UpdateUserInfo} from "../Login/login.actions";

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

function* UpdateInfo(action) {
    // console.log('/users/' + action.pseudo);
    // console.log({ 'pseudo' : action.new_pseudo });
    const response = yield Network.Put('/users/' + action.pseudo, { 'pseudo' : action.new_pseudo });
    if (response.status === 200) {
        yield put(UpdateUserInfo(response.data.user.pseudo, response.data.user.email));
        yield put(UpdateInfoSuccess(response.data.user));
    }
    else {
        if (response.data !== undefined && response.data.message !== undefined)
            yield put(UpdateInfoFail(response.data.message));
        else
            yield put(UpdateInfoFail("Connection error"));
    }
}

export function* UserSagas() {
    yield takeEvery(UserActionsType.GetInfo, GetUserInfo);
    yield takeEvery(UserActionsType.UpdateInfo, UpdateInfo);
}