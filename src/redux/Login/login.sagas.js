import {put, takeEvery} from "redux-saga/effects";
import {LoginActionsType, LoginFail, LoginSuccess} from "./login.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions} from 'react-navigation'
import {UserReset} from "../User/user.actions";

function _login(email, password) {
    return Network.Post("/auth/login", {
        email: email,
        password: password
    });
}

function* Login(action) {
    const response = yield _login(action.email, action.password);
    if (response.status === 200) {
        yield put(LoginSuccess(response.data.access_token, response.data.user.pseudo, response.data.user.email));
        Network.access_token = response.data.access_token;
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

function* Logout(action) {
    yield put(NavigationActions.navigate({routeName: 'Login'}));
    yield put(UserReset());
}

export function* LoginSagas() {
    yield takeEvery(LoginActionsType.Login, Login);
    yield takeEvery(LoginActionsType.Logout, Logout);
}