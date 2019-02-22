import {Network} from "../../Network/Requests";
import {put} from "redux-saga/effects";
import {RemoveGroupMemberFail, RemoveGroupMemberSuccess} from "../../redux/Groups/groups.actions";
import {arrayToObject} from "../../Utils/utils";
import {NavigationActions} from "react-navigation";
import {Toast} from "native-base";

export class GroupService {

    static async GetGroupsForUserPseudo(pseudo) {
        const resp = await Network.Get('/users/' + pseudo + '/groups');
        if (resp.status === 200)
            return resp.data.groups;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async GetGroupsImage(groups) {
        for (let idx = 0; idx < groups.length; idx++) {
            const resp = await Network.Get('/groups/' + groups[idx].id + '/image');
            if (resp.status === 200) {
                groups[idx].image = resp.data.image;
            } else {
                let err;
                if (resp.data !== undefined && resp.data.message !== undefined)
                    err = resp.data.message;
                else
                    err = "Connection error";
                throw err
            }
        }
        return groups
    }


    static async AddGroupMembers(groupId, members) {
        const resp = await Network.Post('/groups/' + groupId + '/add-members', {users: members});
        if (resp.status === 200)
            return resp.data.members;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }


    static async GetGroupDetail(id) {
        const resp = await Network.Get('/groups/' + id);
        if (resp.status === 200)
            return resp.data.group;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async GetGroupMembers(id) {
        const resp = await Network.Get('/groups/' + id + '/members');
        if (resp.status === 200)
            return resp.data.members;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async RemoveGroupMember(groupId, member_pseudo) {
        const resp = await Network.Delete('/groups/' + groupId + '/members/' + member_pseudo);
        if (resp.status === 200)
            return resp.data.members;
        else {
            let err;
            if (resp.data !== undefined && resp.data.message !== undefined)
                err = resp.data.message;
            else
                err = "Connection error";
            throw err;
        }
    }

}

//
// function* _GetGroupInfo(action) {
//     const resp = yield Network.Get('/groups/' + action.id);
//     if (resp.status === 200) {
//         yield put(GetGroupInfoSuccess(resp.data.group))
//     } else {
//         let err;
//         if (resp.data !== undefined && resp.data.message !== undefined)
//             err = resp.data.message;
//         else
//             err = "Connection error";
//         yield Toast.show({
//             text: err,
//             type: "danger",
//             buttonText: "Okay",
//             duration: 5000
//         });
//         yield put(GetGroupInfoSuccess(err));
//     }
// }
//
//
// function* GetGroupInfo(action) {
//     const resp = yield Network.Get('/groups/' + action.id);
//     if (resp.status === 200) {
//         yield put(GetGroupInfoSuccess(resp.data.group))
//     } else {
//         let err;
//         if (resp.data !== undefined && resp.data.message !== undefined)
//             err = resp.data.message;
//         else
//             err = "Connection error";
//         yield Toast.show({
//             text: err,
//             type: "danger",
//             buttonText: "Okay",
//             duration: 5000
//         });
//         yield put(GetGroupInfoSuccess(err));
//     }
// }
//
// function* GetGroupMembers(action) {
//     const resp = yield Network.Get('/groups/' + action.id + '/members');
//     if (resp.status === 200) {
//         yield put(GetGroupMembersSuccess(action.id, resp.data.members))
//     } else {
//         let err;
//         if (resp.data !== undefined && resp.data.message !== undefined)
//             err = resp.data.message;
//         else
//             err = "Connection error";
//         yield Toast.show({
//             text: err,
//             type: "danger",
//             buttonText: "Okay",
//             duration: 5000
//         });
//         yield put(GetGroupMembersFail(err));
//     }
// }
//
// function* RemoveGroupMember(action) {
//     const resp = yield Network.Delete('/groups/' + action.groupId + '/members/' + action.member.pseudo);
//     if (resp.status === 200) {
//         const selfKick = action.Selfpseudo === action.member.pseudo;
//         yield put(RemoveGroupMemberSuccess(action.groupId, resp.data.members, selfKick));
//         if (selfKick)
//             yield put(NavigationActions.navigate({routeName: 'Master'}));
//         yield Toast.show({
//             text: "Update successful.",
//             type: "success",
//             buttonText: "Okay",
//             duration: 10000
//         });
//     } else {
//         let err;
//         if (resp.data !== undefined && resp.data.message !== undefined)
//             err = resp.data.message;
//         else
//             err = "Connection error";
//         yield Toast.show({
//             text: err,
//             type: "danger",
//             buttonText: "Okay",
//             duration: 5000
//         });
//         yield put(RemoveGroupMemberFail(err));
//     }
// }
//
//
// function* UpdateMemberRole(action) {
//     const resp = yield Network.Put('/groups/' + action.groupId + "/members/" + action.member.pseudo, {role: action.newRole});
//     if (resp.status === 200) {
//         yield put(UpdateMemberRoleSuccess(action.groupId, resp.data.member));
//         yield Toast.show({
//             text: "Update successful.",
//             type: "success",
//             buttonText: "Okay",
//             duration: 10000
//         });
//     } else {
//         let err;
//         if (resp.data !== undefined && resp.data.message !== undefined)
//             err = resp.data.message;
//         else
//             err = "Connection error";
//         yield Toast.show({
//             text: err,
//             type: "danger",
//             buttonText: "Okay",
//             duration: 5000
//         });
//         yield put(UpdateMemberRoleFail(err));
//     }
// }
//
// function* AddGroupMembers(action) {
//     const resp = yield Network.Post('/groups/' + action.groupId + '/add-members', {users: action.members});
//     if (resp.status === 200) {
//         yield put(AddGroupMembersSuccess(action.groupId, resp.data.members));
//         yield Toast.show({
//             text: "Update successful.",
//             type: "success",
//             buttonText: "Okay",
//             duration: 10000
//         });
//     } else {
//         let err;
//         if (resp.data !== undefined && resp.data.message !== undefined)
//             err = resp.data.message;
//         else
//             err = "Connection error";
//         yield Toast.show({
//             text: err,
//             type: "danger",
//             buttonText: "Okay",
//             duration: 5000
//         });
//         yield put(AddGroupMembersFail(err));
//     }
// }
//
// function* EditGroupInfo(action) {
//     const resp = yield Network.Put('/groups/' + action.group.id, {
//         name: action.group.name,
//         description: action.group.description
//     });
//     if (resp.status === 200) {
//         yield put(EditGroupInfoSuccess(resp.data.group));
//         yield Toast.show({
//             text: "Update successful.",
//             type: "success",
//             buttonText: "Okay",
//             duration: 10000
//         });
//     } else {
//         let err;
//         if (resp.data !== undefined && resp.data.message !== undefined)
//             err = resp.data.message;
//         else
//             err = "Connection error";
//         yield Toast.show({
//             text: err,
//             type: "danger",
//             buttonText: "Okay",
//             duration: 5000
//         });
//         yield put(EditGroupInfoFail(err));
//     }
// }
//
// function* CreateGroup(action) {
//     const resp = yield Network.Post('/groups', {
//         name: action.group.name,
//         members: action.group.members,
//         description: action.group.description
//     });
//     if (resp.status === 201) {
//         yield put(CreateGroupSuccess(resp.data.group));
//         yield Toast.show({
//             text: "Creation successful.",
//             type: "success",
//             buttonText: "Okay",
//             duration: 10000
//         });
//     } else {
//         let err;
//         if (resp.data !== undefined && resp.data.message !== undefined)
//             err = resp.data.message;
//         else
//             err = "Connection error";
//         yield Toast.show({
//             text: err,
//             type: "danger",
//             buttonText: "Okay",
//             duration: 5000
//         });
//         yield put(CreateGroupFail(err));
//     }
// }
//
// function* DeleteGroup(action) {
//     const resp = yield Network.Delete('/groups/' + action.groupId);
//     if (resp.status === 200) {
//         yield put(DeleteGroupSuccess(action.groupId));
//         yield Toast.show({
//             text: "Update successful.",
//             type: "success",
//             buttonText: "Okay",
//             duration: 10000
//         });
//     } else {
//         let err;
//         if (resp.data !== undefined && resp.data.message !== undefined)
//             err = resp.data.message;
//         else
//             err = "Connection error";
//         yield Toast.show({
//             text: err,
//             type: "danger",
//             buttonText: "Okay",
//             duration: 5000
//         });
//         yield put(DeleteGroupFail(err));
//     }
// }
//
// function* UpdateGroupImage(action) {
//     const data = new FormData();
//     data.append('image', {
//         uri: action.image.uri,
//         type: 'image/jpeg', // or photo.type
//         name: 'GroupProfilePicture'
//     });
//     const resp = yield Network.PostMultiPart('/groups/' + action.groupId + '/upload-image', data);
//     if (resp.status === 200) {
//         yield put(UpdateGroupImageSuccess(action.groupId, action.image.uri));
//         yield Toast.show({
//             text: "Update successful.",
//             type: "success",
//             buttonText: "Okay",
//             duration: 10000
//         });
//     } else {
//         let err;
//         console.log(resp);
//         if (resp.data !== undefined && resp.data.message !== undefined)
//             err = resp.data.message;
//         else
//             err = "Connection error";
//         yield Toast.show({
//             text: err,
//             type: "danger",
//             buttonText: "Okay",
//             duration: 5000
//         });
//         yield put(UpdateGroupImageFail(err));
//     }
// }
