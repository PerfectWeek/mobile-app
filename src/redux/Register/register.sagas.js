import {put, takeEvery} from "redux-saga/effects";
import {RegisterActionsType, RegisterFail, RegisterSuccess} from "./register.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions, StackActions} from 'react-navigation'

function _register(username, email, password) {
    return Network.Post("/users/", {
        pseudo: username,
        email: email,
        password: password
    });
}

function* Register(action) {
    const response = yield _register(action.username, action.email, action.password);
    if (response.status === 201) {
        yield put(RegisterSuccess());
        // yield put(NavigationActions.navigate({routeName: 'Home'}));
    }
    else {
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            yield put(RegisterFail(response.data.message));
        else
            yield put(RegisterFail("Connection error"));
    }
}

export function* RegisterSagas() {
    yield takeEvery(RegisterActionsType.Register, Register);
}