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
    RemoveGroupMemberSuccess,
    RemoveGroupMemberFail,
    EditGroupInfoFail,
    EditGroupInfoSuccess,
    CreateGroupSuccess,
    CreateGroupFail,
    DeleteGroupSuccess,
    DeleteGroupFail,
    GetGroupInfoSuccess,
    GetGroupsImage,
    GetGroupsImageFail,
    GetGroupsImageSuccess, UpdateGroupImageSuccess, UpdateGroupImageFail
} from "./groups.actions";
import {Network} from "../../Network/Requests";
import {Toast} from "native-base";
import {NavigationActions} from "react-navigation";

function* GetGroups(action) {
    const resp = yield Network.Get('/users/' + action.pseudo + '/groups');
    if (resp.status === 200) {
        const groupMap = resp.data.groups.reduce(function (map, obj) {
            map[obj.id] = obj;
            return map;
        }, {});
        yield put(GetGroupSuccess(groupMap));
        yield put(GetGroupsImage(groupMap));
    } else {
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

function* _GetGroupsImage(action) {
    let groupsArray = Object.values(action.groups);
    for (let idx = 0; idx < groupsArray.length; idx++) {
        const resp = yield Network.Get('/groups/' + groupsArray[idx].id + '/image');
        if (resp.status === 200) {
            groupsArray[idx].image = resp.data.image;
        } else {
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
            yield put(GetGroupsImageFail(err));
            return;
        }
    }
    yield put(GetGroupsImageSuccess(action.groups));
}

function* GetGroupInfo(action) {
    const resp = yield Network.Get('/groups/' + action.id);
    if (resp.status === 200) {
        yield put(GetGroupInfoSuccess(resp.data.group))
    } else {
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
        yield put(GetGroupInfoSuccess(err));
    }
}

function* GetGroupMembers(action) {
    const resp = yield Network.Get('/groups/' + action.id + '/members');
    if (resp.status === 200) {
        yield put(GetGroupMembersSuccess(action.id, resp.data.members))
    } else {
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
    const resp = yield Network.Delete('/groups/' + action.groupId + '/members/' + action.member.pseudo);
    if (resp.status === 200) {
        const selfKick = action.Selfpseudo === action.member.pseudo;
        yield put(RemoveGroupMemberSuccess(action.groupId, resp.data.members, selfKick));
        if (selfKick)
            yield put(NavigationActions.navigate({routeName: 'Master'}));
        yield Toast.show({
            text: "Update successful.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
    } else {
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
    } else {
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
    const resp = yield Network.Post('/groups/' + action.groupId + '/add-members', {users: action.members});
    if (resp.status === 200) {
        yield put(AddGroupMembersSuccess(action.groupId, resp.data.members));
        yield Toast.show({
            text: "Update successful.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
    } else {
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
    const resp = yield Network.Put('/groups/' + action.group.id, {
        name: action.group.name,
        description: action.group.description
    });
    if (resp.status === 200) {
        yield put(EditGroupInfoSuccess(resp.data.group));
        yield Toast.show({
            text: "Update successful.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
    } else {
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

function* CreateGroup(action) {
    const resp = yield Network.Post('/groups', {
        name: action.group.name,
        members: action.group.members,
        description: action.group.description
    });
    if (resp.status === 201) {
        yield put(CreateGroupSuccess(resp.data.group));
        yield Toast.show({
            text: "Creation successful.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
    } else {
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
        yield put(CreateGroupFail(err));
    }
}

function* DeleteGroup(action) {
    const resp = yield Network.Delete('/groups/' + action.groupId);
    if (resp.status === 200) {
        yield put(DeleteGroupSuccess(action.groupId));
        yield Toast.show({
            text: "Update successful.",
            type: "success",
            buttonText: "Okay",
            duration: 10000
        });
    } else {
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
        yield put(DeleteGroupFail(err));
    }
}

function* UpdateGroupImage(action) {
    const data = new FormData();
    data.append('image', {
        uri: action.image.uri,
        type: 'image/jpeg', // or photo.type
        name: 'GroupProfilePicture'
    });
    const resp = yield Network.PostMultiPart('/groups/' + action.groupId + '/upload-image', data);
    if (resp.status === 200) {
        yield put(UpdateGroupImageSuccess(action.groupId, action.image.uri));
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
        yield put(UpdateGroupImageFail(err));
    }
}


export function* GroupSaga() {
    yield takeEvery(GroupsActionType.UpdateGroupImage, UpdateGroupImage);
    yield takeEvery(GroupsActionType.GetGroups, GetGroups);
    yield takeEvery(GroupsActionType.GetGroupsImage, _GetGroupsImage);
    yield takeEvery(GroupsActionType.GetGroupMembers, GetGroupMembers);
    yield takeEvery(GroupsActionType.UpdateMemberRole, UpdateMemberRole);
    yield takeEvery(GroupsActionType.AddGroupMembers, AddGroupMembers);
    yield takeEvery(GroupsActionType.RemoveGroupMember, RemoveGroupMember);
    yield takeEvery(GroupsActionType.EditGroupInfo, EditGroupInfo);
    yield takeEvery(GroupsActionType.CreateGroup, CreateGroup);
    yield takeEvery(GroupsActionType.DeleteGroup, DeleteGroup);
    yield takeEvery(GroupsActionType.GetGroupInfo, GetGroupInfo);
}
