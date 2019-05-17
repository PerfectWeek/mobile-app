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
    GetGroupsImageSuccess, UpdateGroupImageSuccess, UpdateGroupImageFail, GetGroupInfoFail, SetLoading
} from "./groups.actions";
import {Network} from "../../Network/Requests";
import {NavigationActions} from "react-navigation";
import {GroupService} from "../../Services/Groups/groups";
import {UserService} from "../../Services/Users/users";
import {arrayToObject} from "../../Utils/utils";
import {GetUsersInfo} from "../User/user.actions";
import {ShowErrorNotification, ShowSuccessNotification} from "../../Utils/NotificationsModals";
import {GetCalendars} from "../Calendar/calendar.actions";


function* GetGroups(action) {
    yield put(SetLoading(true));
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
        yield ShowErrorNotification(err);
        yield put(GetGroupFail(err));
    }
    yield put(SetLoading(false));
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
        yield ShowErrorNotification(err);
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
        yield ShowSuccessNotification();
    } catch (err) {
        yield ShowErrorNotification(err);
        yield put(RemoveGroupMemberFail(err))
    }
}

function* UpdateMemberRole(action) {
    const resp = yield Network.Put('/groups/' + action.groupId + "/members/" + action.member.pseudo, {role: action.newRole});
    if (resp.status === 200) {
        yield put(UpdateMemberRoleSuccess(action.groupId, resp.data.member));
        yield ShowSuccessNotification();
    } else {
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        yield ShowErrorNotification(err);
        yield put(UpdateMemberRoleFail(err));
    }
}

function* AddGroupMembers(action) {
    try {
        const members = yield GroupService.AddGroupMembers(action.groupId, action.members);
        yield put(GetUsersInfo(members));
        let arr = []
        for (let i = 0 ; i < members.length; i++) {
            arr.push({'pseudo': members[i].pseudo})
        }
        yield put(AddGroupMembersSuccess(action.groupId, arr));
        yield ShowSuccessNotification();
    } catch (err) {
        yield ShowErrorNotification(err);
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
        yield ShowSuccessNotification();
    } else {
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        yield ShowErrorNotification(err);
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
        let res = yield GroupService.GetGroupsImage([resp.data.group]);
        resp.data.group.image = res[0].image;
        yield put(GetCalendars({pseudo: action.pseudo}));
        yield put(CreateGroupSuccess(resp.data.group));
        yield ShowSuccessNotification("Creation successful");
    } else {
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        yield ShowErrorNotification(err);
        yield put(CreateGroupFail(err));
    }
}

function* DeleteGroup(action) {
    const resp = yield Network.Delete('/groups/' + action.groupId);
    if (resp.status === 200) {
        yield put(DeleteGroupSuccess(action.groupId));
        yield ShowSuccessNotification();
    } else {
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        yield ShowErrorNotification(err);
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
        yield ShowSuccessNotification();
    } else {
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        yield ShowErrorNotification(err);
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
