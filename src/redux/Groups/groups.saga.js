import {put, takeEvery} from "redux-saga/effects";
import {
    GetGroupSuccess,
    GetGroupFail,
    GroupsActionType,
    GetGroupMembersSuccess,
    GetGroupMembersFail
} from "./groups.actions";
import {Network} from "../../Network/Requests";

function* GetGroups(action) {
    const resp = yield Network.Get('/users/' + action.pseudo + '/groups');
    if (resp.status === 200) {
        yield put(GetGroupSuccess(resp.data.groups))
    }
    else {
        if (resp.data !== undefined && resp.data.message !== undefined) {
            console.log(resp);
            yield put(GetGroupFail(resp.data.message));
        }
        else {
            console.log(resp);
            yield put(GetGroupFail("Connection error"));
        }
    }
}

function* GetGroupMembers(action) {
    const resp = yield Network.Get('/groups/' + action.id + '/members');
    if (resp.status === 200) {
        yield put(GetGroupMembersSuccess(action.id, resp.data.members))
    }
    else {
        if (resp.data !== undefined && resp.data.message !== undefined) {
            console.log(resp);
            yield put(GetGroupMembersFail(resp.data.message));
        }
        else {
            console.log(resp);
            yield put(GetGroupMembersFail("Connection error"));
        }
    }
}

export function* GroupSaga() {
    yield takeEvery(GroupsActionType.GetGroups, GetGroups);
    yield takeEvery(GroupsActionType.GetGroupMembers, GetGroupMembers);
}