import {put, takeEvery} from "redux-saga/effects";
import {RegisterActionsType, RegisterFail, RegisterSuccess} from "./register.actions";
import {Network} from "../../Network/Requests";
import {Toast} from "native-base";

function _register(username, email, password) {
    // return Network.Post("/users", {
    //     pseudo: username,
    //     email: email,
    //     password: password
    // });
    return Network.strapi.register(username,email,password);
}

function* Register(action) {
    try {
        const response = yield _register(action.username, action.email, action.password);
            yield Toast.show({
                text: "User created. We sent you an email for confirmation.",
                type: "success",
                buttonText: "Okay",
                duration: 10000
            });
            yield put(RegisterSuccess());
    }
    catch (e) {
        let err;
        if (e.status !== 500 && e.message !== undefined)
            err = e.message;
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