import {put, takeEvery} from "redux-saga/effects";
import {LoginActionsType, LoginFail, LoginSuccess} from "./login.actions";
import {Post} from "../../Network/Requests";

function _login(email, password) {
    return Post("/auth/login", {
        email: email,
        password: password
    });
}

function* Login(action) {
    const response = yield _login(action.email, action.password);
    if (response.status === 200)
    {
        yield put(LoginSuccess(response.data.access_token));
    }
    else
    {
        yield put(LoginFail());
    }
}

export function* LoginSagas() {
    yield takeEvery(LoginActionsType.Login, Login);
}