import {put, takeEvery} from "redux-saga/effects";
import {GetGroupSuccess, GetGroupFail, GroupsActionType} from "./groups.actions";
import {Network} from "../../Network/Requests";
import {Alert} from 'react-native'


function* GetGroups(action) {
    const resp = yield Network.Get('/users/' + action.pseudo + '/groups');
    if (resp.status === 200) {
        console.log(resp.data.groups);
        yield put(GetGroupSuccess(resp.data.groups))
    }
    else {
        if (resp.data !== undefined && resp.data.message !== undefined) {
            console.log(resp);
            Alert.alert('Something went wrongo !');
            yield put(GetGroupFail(resp.data.message));
        }
        else {
            console.log(resp);
            Alert.alert('Something went wrongu !');
            yield put(GetGroupFail("Connection error"));
        }
    }
}

export function* GroupSaga() {
    yield takeEvery(GroupsActionType.GetGroups, GetGroups)
}