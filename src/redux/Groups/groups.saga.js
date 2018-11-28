import {all, call, put, takeEvery} from "redux-saga/effects";
import {
    GetGroupSuccess,
    GetGroupFail,
    GroupsActionType,
    GetGroupMembersSuccess,
    GetGroupMembersFail, UpdateMemberRoleFail, UpdateMemberRoleSuccess
} from "./groups.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions} from "react-navigation";
import * as selectors from '../selector';
import {select} from 'redux-saga/effects';
import {Toast} from "native-base";

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

function* UpdateMemberRole(action) {
    const resp = yield Network.Put('/groups/' + action.groupId + "/members/" + action.member.pseudo, {role: action.newRole});
    if (resp.status === 200) {
        yield put(UpdateMemberRoleSuccess(action.groupId, resp.data.member));
        yield Toast.show({
            text: "Update successful.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
    }
    else {
        let err;
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
        yield put(UpdateMemberRoleFail(err));
    }
}

export function* GroupSaga() {
    yield takeEvery(GroupsActionType.GetGroups, GetGroups);
    yield takeEvery(GroupsActionType.GetGroupMembers, GetGroupMembers);
    yield takeEvery(GroupsActionType.UpdateMemberRole, UpdateMemberRole);
}
