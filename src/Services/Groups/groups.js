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

