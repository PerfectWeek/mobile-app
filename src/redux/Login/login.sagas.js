import {put, takeEvery} from "redux-saga/effects";
import {LoginActionsType, LoginFail, LoginSuccess, UpdateUserInfo} from "./login.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions, StackActions} from 'react-navigation'

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
//
// function* _UpdateUserInfo(action) {
//     yield put(UpdateUserInfo(action.pseudo, action.email));
// }

export function* LoginSagas() {
    yield takeEvery(LoginActionsType.Login, Login);
    // yield takeEvery(LoginActionsType.UpdateUserInfo, _UpdateUserInfo);
}