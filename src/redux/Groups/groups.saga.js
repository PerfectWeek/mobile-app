import {call, put, takeEvery, select} from "redux-saga/effects";
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
import {CalService} from "../../Services/Groups/groups";
import {UserService} from "../../Services/Users/users";
import {arrayToObject} from "../../Utils/utils";
import {GetUsersInfo} from "../User/user.actions";
import {ShowErrorNotification, ShowSuccessNotification} from "../../Utils/NotificationsModals";
import {GetCalendars} from "../Calendar/calendar.actions";


function* GetGroups(action) {
    yield put(SetLoading(true));
    try {
        const cals = yield CalService.GetCalForUserPseudo(action.pseudo);
        const calsMap = yield cals.reduce(function (map, obj) {
            map[obj.id] = obj;
            return map;
        }, {});


        let groupsArray = Object.values(cals);
        let res = yield CalService.GetGroupsImage(groupsArray);
        yield put(GetGroupsImageSuccess(res));
        yield put(GetGroupSuccess(calsMap));
    } catch (err) {
        yield ShowErrorNotification(err);
        yield put(GetGroupFail(err));
    }
    yield put(SetLoading(false));
}

function* GetGroupInfo(action) {
    try {
        const group = yield CalService.GetGroupDetail(action.id);
        // let members = yield CalService.GetGroupMembers(action.id);
        // members = yield UserService.GetUsersImage(members);
        // members = arrayToObject(members, "pseudo");
        // yield put(GetGroupMembersSuccess(action.id, members));
        yield put(GetGroupInfoSuccess(group))
    } catch (err) {
        yield ShowErrorNotification(err);
        yield put(GetGroupInfoFail(err))
    }
}

function* RemoveGroupMember(action) {
    try {
        const members = yield CalService.RemoveGroupMember(action.groupId, action.member.pseudo);
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
        console.log('QWQWQWQWQ', action)
        const members = yield CalService.AddGroupMembers(action.groupId, action.members);
        let users2 = yield select((state) => {
            return state.user.users
        });
        // console.log('USER', users2)
        yield put(GetUsersInfo(members));
        let users = yield select((state) => {
            return state.user.users
        });
        // console.log('USER2', users)
        yield put(AddGroupMembersSuccess(action.groupId, arrayToObject(members, "name")));
        yield ShowSuccessNotification();
    } catch (err) {
        yield ShowErrorNotification(err);
        yield put(AddGroupMembersFail(err))
    }
}

function* EditGroupInfo(action) {
    const resp = yield Network.Put('/calendars/' + action.group.id, {
        name: action.group.name,
        color: action.group.color
    });
    if (resp.status === 200) {
        yield put(EditGroupInfoSuccess(resp.data.calendar));
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
    // console.log('action', action)
    const resp = yield Network.Post('/calendars', {
        name: action.group.name,
        color: action.group.color,
    });
    // console.log('po', resp)
    if (resp.status === 201) {
        const img = yield CalService.GetGroupsImage([resp.data.calendar]);
        // console.log('pimo', img)
        yield put(GetCalendars({pseudo: action.pseudo}));
        yield put(CreateGroupSuccess({...resp.data.calendar, image: img[0].image}));
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
    const resp = yield Network.Delete('/calendars/' + action.groupId);
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
    const resp = yield Network.PutMultiPart('/calendars/' + action.groupId + '/images/icon', data);
    // console.log('action', action, resp)
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
