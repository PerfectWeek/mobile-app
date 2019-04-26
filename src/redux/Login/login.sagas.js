import {put, takeEvery} from "redux-saga/effects";
import {LoginActionsType, LoginFail, LoginSuccess, ResetStores} from "./login.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions} from 'react-navigation'
import {UserReset} from "../User/user.actions";
import {Toast} from "native-base";

function _login(email, password) {
    // return Network.Post("/auth/login", {
    //     email: email,
    //     password: password
    // });
    // console.log(Network.strapi.login(email, password))
    return Network.strapi.login(email, password);
}

function* CheckIsLogged(action) {
    if (Network.access_token === undefined || Network.access_token === '' || Network.access_token === null) {
        const savedToken = yield Network.CheckToken();
        if (savedToken !== null) {
            Network.access_token = savedToken.token;
            Network.strapi.setToken(savedToken.token, true);
            yield put(LoginSuccess(savedToken.token, savedToken.name, savedToken.email));
            yield put(NavigationActions.navigate({routeName: 'Home'}));
        }
    }
}

function* Login(action) {
    try {
        const response = yield _login(action.email, action.password + 's');
        yield put(LoginSuccess(response.jwt, response.user.username, response.user.email));
        Network.access_token = response.jwt;
        yield Network.SaveToken(response.user.email, response.user.pseudo);
        yield put(NavigationActions.navigate({routeName: 'Home'}));
    }
    catch (e) {
        let err;
        if (e.message !== undefined)
            err = e.message;
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

function* SetLogged(action) {
    yield put(LoginSuccess(action.access_token, action.pseudo, action.email));
    Network.access_token = action.access_token;
    yield Network.SaveToken(action.email, action.pseudo);
    yield put(NavigationActions.navigate({routeName: 'Home'}));
}


function* LoginGoogle(action) {
    yield put(LoginSuccess(action.accessToken, action.pseudo, action.email));
    Network.access_token = action.accessToken;
    yield Network.SaveToken(action.email, action.pseudo);
    yield put(NavigationActions.navigate({routeName: 'Home'}));
}


function* Logout(action) {
    yield Network.deleteToken();
    yield put(NavigationActions.navigate({routeName: 'Login'}));
    yield put(UserReset());
    yield put(ResetStores());
}

export function* LoginSagas() {
    yield takeEvery(LoginActionsType.SetLogged, SetLogged);
    yield takeEvery(LoginActionsType.CheckIfLogged, CheckIsLogged);
    yield takeEvery(LoginActionsType.Login, Login);
    yield takeEvery(LoginActionsType.LoginGoogle, LoginGoogle);
    yield takeEvery(LoginActionsType.Logout, Logout);
}