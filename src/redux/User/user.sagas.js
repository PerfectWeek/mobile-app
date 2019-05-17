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
import {UserService} from "../../Services/Users/users";
import {Logout} from "../Login/login.actions";
import {ShowErrorNotification, ShowSuccessNotification} from "../../Utils/NotificationsModals";

function* GetUserInfo(action) {
    try {
        const user = yield UserService.GetUserInfo(action.pseudo);
        user.image = yield UserService.GetUserImage(action.pseudo);
        yield put(GetUserInfoSuccess(user));
    } catch (err) {
        yield ShowErrorNotification(err);
        yield put(GetUserInfoFail(err))
    }
}

function* GetUsersInfo(action) {
    // console.log('actino', action)
    for (let idx = 0; idx < action.users.length; idx++) {
        try {
            const user = yield UserService.GetUserInfo(action.users[idx].pseudo);
            user.image = yield UserService.GetUserImage(action.users[idx].pseudo);
            yield put(SetUserInfo(user));
        } catch (err) {
            yield ShowErrorNotification(err);
            yield put(GetUserInfoFail(err));
            return;
        }
    }
}

function* _GetUserImage(action) {
    try {
        const image = yield UserService.GetUserImage(action.pseudo);
        yield put(GetUserImageSuccess(image));
    } catch (err) {
        yield ShowErrorNotification(err);
        yield put(GetUserImageFail(err));
    }

}

function* UpdateUserInfo(action) {
    try {
        const user = yield UserService.UpdateUserInfo(action.pseudo, action.new_pseudo);
        yield put(UpdateUserInfoSuccess(user));
        yield ShowSuccessNotification();
        yield put(Logout());
    } catch (err) {
        yield ShowErrorNotification(err);
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
        yield ShowSuccessNotification();
    } catch (err) {
        yield ShowErrorNotification(err);
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