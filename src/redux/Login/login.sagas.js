import {put, takeEvery} from "redux-saga/effects";
import {LoginActionsType, LoginFail, LoginSuccess, ResetStores} from "./login.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions} from 'react-navigation'
import {UserReset} from "../User/user.actions";
import {Toast} from "native-base";

function _login(email, password) {
    return Network.Post("/auth/login", {
        email: email,
        password: password
    });
}

function* CheckIsLogged(action) {
    if (Network.access_token === undefined || Network.access_token === '' || Network.access_token === null) {
        const savedToken = yield Network.CheckToken();
        if (savedToken !== null) {
            Network.access_token = savedToken.token;
            yield put(LoginSuccess(savedToken.token, savedToken.name, savedToken.email));
            yield put(NavigationActions.navigate({routeName: 'Home'}));
        }
    }
}

function* Login(action) {
    const response = yield _login(action.email, action.password);
    if (response.status === 200) {
        yield put(LoginSuccess(response.data.access_token, response.data.user.pseudo, response.data.user.email));
        Network.access_token = response.data.access_token;
        yield Network.SaveToken(response.data.user.email, response.data.user.pseudo);
        yield put(NavigationActions.navigate({routeName: 'Home'}));

    }
    else {
        let err;
        if (response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield put(LoginFail(err));
        Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
    }
}

function* Logout(action) {
    yield Network.deleteToken();
    yield put(NavigationActions.navigate({routeName: 'Login'}));
    yield put(UserReset());
    yield put(ResetStores());
}

export function* LoginSagas() {
    yield takeEvery(LoginActionsType.CheckIfLogged, CheckIsLogged);
    yield takeEvery(LoginActionsType.Login, Login);
    yield takeEvery(LoginActionsType.Logout, Logout);
}