import {put, takeEvery} from "redux-saga/effects";
import {LoginActionsType, LoginFail, LoginSuccess, ResetStores} from "./login.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions} from 'react-navigation'
import {Toast} from "native-base";

// import * as Segment from "expo-analytics-segment";

function _login(email, password) {
    return Network.Post("/auth/local/login", {
        email: email,
        password: password
    });
}

function* CheckIsLogged(action) {
    if (Network.access_token === undefined || Network.access_token === '' || Network.access_token === null) {
        const savedToken = yield Network.CheckToken();
        if (savedToken !== null) {
            Network.access_token = savedToken.token;
            // Segment.identify(savedToken.name);
            // Segment.track({
            //     "type": "track" ,
            //     "event": "Registered",
            //     "properties": {
            //         "accountType" : "Email"
            //     }
            // });
            yield put(LoginSuccess(savedToken.token, savedToken.name, savedToken.email, savedToken.id));
            yield put(NavigationActions.navigate({routeName: 'Home'}));
        }
    }
}

function* Login(action) {
    const response = yield _login(action.email, action.password);
    if (response.status === 200) {
        yield put(LoginSuccess(response.data.token, response.data.user.name, response.data.user.email, response.data.user.id));
        Network.access_token = response.data.token;
        yield Network.SaveToken(response.data.user.email, response.data.user.name, response.data.user.id);
        yield put(NavigationActions.navigate({routeName: 'Home'}));

    } else {
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

function* SetLogged(action) {
    yield put(LoginSuccess(action.access_token, action.pseudo, action.email, action.id));
    Network.access_token = action.access_token;
    yield Network.SaveToken(action.email, action.pseudo, action.id);
    yield put(NavigationActions.navigate({routeName: 'Home'}));
}


function* LoginGoogle(action) {
    yield put(LoginSuccess(action.accessToken, action.pseudo, action.email, action.id));
    Network.access_token = action.accessToken;
    yield Network.SaveToken(action.email, action.pseudo, action.id);
    yield put(NavigationActions.navigate({routeName: 'Home'}));
}


function* Logout(action) {
    yield Network.deleteToken();
    yield put(NavigationActions.navigate({routeName: 'Login'}));
    // yield put(ResetStores());
}

export function* LoginSagas() {
    yield takeEvery(LoginActionsType.SetLogged, SetLogged);
    yield takeEvery(LoginActionsType.CheckIfLogged, CheckIsLogged);
    yield takeEvery(LoginActionsType.Login, Login);
    yield takeEvery(LoginActionsType.LoginGoogle, LoginGoogle);
    yield takeEvery(LoginActionsType.Logout, Logout);
}
