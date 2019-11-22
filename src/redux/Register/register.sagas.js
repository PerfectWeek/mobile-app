import {put, takeEvery} from "redux-saga/effects";
import {RegisterActionsType, RegisterFail, RegisterSuccess} from "./register.actions";
import {Network} from "../../Network/Requests";
import {Toast} from "native-base";

function _register(username, email, password) {
    return Network.Post("/auth/local/register", {
        name: username,
        email: email,
        password: password
    });
}

function* Register(action) {
    const response = yield _register(action.username, action.email, action.password);
    if (response.status === 201) {
        yield Toast.show({
            text: "User created. We sent you an email for confirmation.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
        yield put(RegisterSuccess());
    }
    else {
        let err;
        if (response.status !== 500 && response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield put(RegisterFail(err));
       yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
    }
}

export function* RegisterSagas() {
    yield takeEvery(RegisterActionsType.Register, Register);
}
