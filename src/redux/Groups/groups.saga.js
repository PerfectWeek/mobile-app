import {put, takeEvery} from "redux-saga/effects";
import {GetGroupSuccess, GetGroupFail, GroupsActionType} from "./groups.actions";
import {Network} from "../../Network/Requests";


function* GetGroup(action) {
    const resp = yield Network.Get('groups/' + action.groupId + '/');
    if (resp.status === 200) {
        console.log(resp.data.group);
        yield put(GetGroupSuccess(resp.data.group))
    }
    else {
        if (resp.data !== undefined && resp.data.message !== undefined)
            yield put(GetGroupFail(resp.data.message));
        else
            yield put(GetGroupFail("Connection error"));
    }
}

export function* GroupSaga() {
    yield takeEvery(GroupsActionType.GetGroup, GetGroup)
}