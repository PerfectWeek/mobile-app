import {put, takeEvery} from "redux-saga/effects";
import {
    DeleteUserFail,
    DeleteUserSuccess,
    GetInfoFail,
    GetInfoSuccess, GetUserImage, GetUserImageFail, GetUserImageSuccess,
    UpdateInfoFail,
    UpdateInfoSuccess, UpdateUserImageFail, UpdateUserImageSuccess,
    UserActionsType
} from "./user.actions";
import {Network} from "../../Network/Requests";
import {UpdateUserInfo} from "../Login/login.actions";
import {NavigationActions} from "react-navigation";
import {Toast} from "native-base";

function* GetUserInfo(action) {
    const response = yield Network.Get('/users/' + action.pseudo);
    if (response.status === 200) {
        yield put(GetInfoSuccess(response.data.user));
        yield put(GetUserImage(action.pseudo));
    } else {
        let err;
        if (response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield Toast.show({text: err, type: "danger", buttonText: "Okay", duration: 5000});
        yield put(GetInfoFail(err));
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


function* UpdateInfo(action) {
    const response = yield Network.Put('/users/' + action.pseudo, {'pseudo': action.new_pseudo});
    if (response.status === 200) {
        yield put(UpdateUserInfo(response.data.user.pseudo, response.data.user.email));
        yield put(UpdateInfoSuccess(response.data.user));
        yield Toast.show({
            text: "Update successful.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
    } else {
        let err;
        if (response.data !== undefined && response.data.message !== undefined)
            err = response.data.message;
        else
            err = "Connection error";
        yield put(UpdateInfoFail(err));
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
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
    const data = new FormData();
    data.append('image', {
        uri: action.image.uri,
        type: 'image/jpeg', // or photo.type
        name: 'UserProfilePicture'
    });
    const resp = yield Network.PostMultiPart('/users/' + action.pseudo + '/upload-image', data);
    if (resp.status === 200) {
        yield put(UpdateUserImageSuccess(action.image.uri));
        yield Toast.show({
            text: "Update successful.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
    } else {
        let err;
        console.log(resp);
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
        yield put(UpdateUserImageFail(err));
    }
}

export function* UserSagas() {
    yield takeEvery(UserActionsType.UpdateUserImage, UpdateUserImage);
    yield takeEvery(UserActionsType.GetInfo, GetUserInfo);
    yield takeEvery(UserActionsType.GetUserImage, _GetUserImage);
    yield takeEvery(UserActionsType.UpdateInfo, UpdateInfo);
    yield takeEvery(UserActionsType.DeleteUser, DeleteUser);
}