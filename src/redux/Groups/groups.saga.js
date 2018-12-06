import {put, takeEvery} from "redux-saga/effects";
import {
    GetGroupSuccess,
    GetGroupFail,
    GroupsActionType,
    GetGroupMembersSuccess,
    GetGroupMembersFail,
    UpdateMemberRoleFail,
    UpdateMemberRoleSuccess,
    AddGroupMembersSuccess,
    AddGroupMembersFail,
    RemoveGroupMemberSuccess, RemoveGroupMemberFail, EditGroupInfoFail, EditGroupInfoSuccess,
} from "./groups.actions";
import {Network} from "../../Network/Requests";
import {Toast} from "native-base";

function* GetGroups(action) {
    const resp = yield Network.Get('/users/' + action.pseudo + '/groups');
    if (resp.status === 200) {
        yield put(GetGroupSuccess(resp.data.groups))
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
        yield put(GetGroupFail(err));
    }
}

function* GetGroupMembers(action) {
    const resp = yield Network.Get('/groups/' + action.id + '/members');
    if (resp.status === 200) {
        yield put(GetGroupMembersSuccess(action.id, resp.data.members))
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
        yield put(GetGroupMembersFail(err));
    }
}

function* RemoveGroupMember(action) {
    const resp = yield Network.Delete('/groups/' + action.groupId + '/members' + action.member.pseudo);
    if (resp.status === 200) {
        yield put(RemoveGroupMemberSuccess(action.id, resp.data.members));
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
        yield put(RemoveGroupMemberFail(err));
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

function* AddGroupMembers(action) {
    const resp = yield Network.Post('/groups/' + action.groupId + '/add-members', action.members);
    if (resp.status === 200) {
        yield put(AddGroupMembersSuccess(action.groupId, resp.data.members));
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
        yield put(AddGroupMembersFail(err));
    }
}

function* EditGroupInfo(action) {
    const resp = yield Network.Put('/groups/' + action.group.id, {name: action.group.name});
    if (resp.status === 200) {
        yield put(EditGroupInfoSuccess(resp.data.group));
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
        yield put(EditGroupInfoFail(err));
    }
}

export function* GroupSaga() {
    yield takeEvery(GroupsActionType.GetGroups, GetGroups);
    yield takeEvery(GroupsActionType.GetGroupMembers, GetGroupMembers);
    yield takeEvery(GroupsActionType.UpdateMemberRole, UpdateMemberRole);
    yield takeEvery(GroupsActionType.AddGroupMembers, AddGroupMembers);
    yield takeEvery(GroupsActionType.RemoveGroupMember, RemoveGroupMember);
    yield takeEvery(GroupsActionType.EditGroupInfo, EditGroupInfo);
}
