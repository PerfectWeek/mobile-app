import {call, put, takeEvery} from "redux-saga/effects";
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
    GetGroupsImageSuccess, UpdateGroupImageSuccess, UpdateGroupImageFail, GetGroupInfoFail
} from "./groups.actions";
import {Network} from "../../Network/Requests";
import {Toast} from "native-base";
import {NavigationActions} from "react-navigation";
import {GroupService} from "../../Services/Groups/groups";
import {UserService} from "../../Services/Users/users";
import {arrayToObject} from "../../Utils/utils";
import {GetUsersInfo} from "../User/user.actions";


function* GetGroups(action) {
    try {
        const groups = yield GroupService.GetGroupsForUserPseudo(action.pseudo);
        const groupMap = yield groups.reduce(function (map, obj) {
            map[obj.id] = obj;
            return map;
        }, {});

        let groupsArray = Object.values(groups);
        let res = yield GroupService.GetGroupsImage(groupsArray);
        yield put(GetGroupsImageSuccess(res));
        yield put(GetGroupSuccess(groupMap));
    } catch (err) {
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
        yield put(GetGroupFail(err));
    }
}

function* GetGroupInfo(action) {
    try {
        const group = yield GroupService.GetGroupDetail(action.id);
        let members = yield GroupService.GetGroupMembers(action.id);
        members = yield UserService.GetUsersImage(members);
        members = arrayToObject(members, "pseudo");
        yield put(GetGroupMembersSuccess(action.id, members));
        yield put(GetGroupInfoSuccess(group))
    } catch (err) {
        yield Toast.show({
            text: err,
            type: "danger",
            buttonText: "Okay",
            duration: 5000
        });
        yield put(GetGroupInfoFail(err))
    }
}

function* RemoveGroupMember(action) {
    try {
        const members = yield GroupService.RemoveGroupMember(action.groupId, action.member.pseudo);
        const selfKick = action.Selfpseudo === action.member.pseudo;
        yield put(RemoveGroupMemberSuccess(action.groupId, arrayToObject(members, "pseudo"), selfKick));
        if (selfKick)
            yield put(NavigationActions.navigate({routeName: 'Master'}));
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
        yield put(RemoveGroupMemberFail(err))
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
    try {
        const members = yield GroupService.AddGroupMembers(action.groupId, action.members);
        yield put(GetUsersInfo(members));
        yield put(AddGroupMembersSuccess(action.groupId, arrayToObject(members, "pseudo")));
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
        yield put(AddGroupMembersFail(err))
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
    yield takeEvery(GroupsActionType.UpdateMemberRole, UpdateMemberRole);
    yield takeEvery(GroupsActionType.AddGroupMembers, AddGroupMembers);
    yield takeEvery(GroupsActionType.RemoveGroupMember, RemoveGroupMember);
    yield takeEvery(GroupsActionType.EditGroupInfo, EditGroupInfo);
    yield takeEvery(GroupsActionType.CreateGroup, CreateGroup);
    yield takeEvery(GroupsActionType.DeleteGroup, DeleteGroup);
    yield takeEvery(GroupsActionType.GetGroupInfo, GetGroupInfo);
}
