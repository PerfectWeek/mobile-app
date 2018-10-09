import {put, takeEvery} from "redux-saga/effects";
import {LoginActionsType, LoginFail, LoginSuccess} from "./login.actions";
import {Post} from "../../Network/Requests";
import {NavigationActions, StackActions} from 'react-navigation'

function _login(email, password) {
    return Post("/auth/login", {
        email: email,
        password: password
    });
}

function* Login(action) {
    const response = yield _login(action.email, action.password);
    if (response.status === 200) {
        yield put(LoginSuccess(response.data.access_token));
        yield put(NavigationActions.navigate({routeName: 'Home'}));

    }
    else {
        console.log(response);
        if (response.data !== undefined && response.data.message !== undefined)
            yield put(LoginFail(response.data.message));
        else
            yield put(LoginFail("Connection error"));
    }
}

export function* LoginSagas() {
    yield takeEvery(LoginActionsType.Login, Login);
}