import {put, takeEvery} from "redux-saga/effects";
import {
    DeleteUserFail,
    DeleteUserSuccess,
    GetUserImageFail,
    GetUserImageSuccess,
    GetUserInfoSuccess,
    UpdateUserInfoFail,
    UpdateUserInfoSuccess,
    UpdateUserImageFail,
    UpdateUserImageSuccess,
    UserActionsType, GetUserInfoFail, SetUserInfo
} from "./user.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions} from "react-navigation";
import {Toast} from "native-base";
import {UserService} from "../../Services/Users/users";
import {Logout} from "../Login/login.actions";

function* GetUserInfo(action) {
    try {
        const user = yield UserService.GetUserInfo(action.pseudo);
        user.image = yield UserService.GetUserImage(action.pseudo);
        yield put(GetUserInfoSuccess(user));
    } catch (err) {
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
        yield put(GetUserInfoFail(err))
    }
}

function* GetUsersInfo(action) {
    for (let idx = 0; idx < action.users.length; idx++) {
        try {
            const user = yield UserService.GetUserInfo(action.users[idx].pseudo);
            user.image = yield UserService.GetUserImage(action.users[idx].pseudo);
            yield put(SetUserInfo(user));
        } catch (err) {
            yield Toast.show({
                text: err,
                type: "danger",
                buttonText: "Okay",
                duration: 5000
            });
            yield put(GetUserInfoFail(err));
            return;
        }
    }
}

function* _GetUserImage(action) {
    const response = yield Network.Get('/users/' + action.pseudo + '/image');
    if (response.status === 200) {
        yield put(GetUserImageSuccess(response.data.image));
    } else {
        let err;
        if (response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield Toast.show({text: err, type: "danger", buttonText: "Okay", duration: 5000});
        yield put(GetUserImageFail(err));
    }
}

function* UpdateUserInfo(action) {
    try {
        const user = yield UserService.UpdateUserInfo(action.pseudo, action.new_pseudo);
        yield put(UpdateUserInfoSuccess(user));
        yield Toast.show({
            text: "Update successful.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
        yield put(Logout());
    } catch (err) {
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
        yield put(UpdateUserInfoFail(err))
    }
}

function* DeleteUser(action) {
    const response = yield Network.Delete('/users/' + action.pseudo);
    if (response.status === 200) {
        yield put(DeleteUserSuccess(response.data.user));
        yield put(NavigationActions.navigate({routeName: 'Login'}));
    } else {
        if (response.data !== undefined && response.data.message !== undefined)
            yield put(DeleteUserFail(response.data.message));
        else
            yield put(DeleteUserFail("Connection error"));
    }
}

function* UpdateUserImage(action) {
    try {
        yield UserService.UpdateUserImage(action.image.uri, action.pseudo);
        yield put(UpdateUserImageSuccess(action.image.uri, action.pseudo));
        yield Toast.show({
            text: "Update successful.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
    } catch (err) {
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
        yield put(UpdateUserImageFail(err))
    }
}

export function* UserSagas() {
    yield takeEvery(UserActionsType.UpdateUserImage, UpdateUserImage);
    yield takeEvery(UserActionsType.GetUserInfo, GetUserInfo);
    yield takeEvery(UserActionsType.GetUserImage, _GetUserImage);
    yield takeEvery(UserActionsType.UpdateUserInfo, UpdateUserInfo);
    yield takeEvery(UserActionsType.DeleteUser, DeleteUser);
    yield takeEvery(UserActionsType.GetUsersInfo, GetUsersInfo);
}