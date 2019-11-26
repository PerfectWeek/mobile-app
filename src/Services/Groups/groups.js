import {Network} from "../../Network/Requests";
// import {put} from "redux-saga/effects";
// import {RemoveGroupMemberFail, RemoveGroupMemberSuccess} from "../../redux/Groups/groups.actions";
// import {arrayToObject} from "../../Utils/utils";
// import {NavigationActions} from "react-navigation";
// import {Toast} from "native-base";
import axios from "react-native-axios";
const uuidv4 = require('uuid/v4');

export class CalService {

    static async GetCalForUserPseudo() {
        const resp = await Network.Get('/calendars');
        if (resp.status === 200)
            return resp.data.calendars;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async GetGroupsImage(groups) {
        for (let idx = 0; idx < groups.length; idx++) {
            groups[idx].image = `${axios.defaults.baseURL}/users/${groups[idx].id}/images/profile?rand=${uuidv4()}`

            // const resp = await Network.Get('/calendars/' + groups[idx].id + '/images/icon');
            // console.log('re', resp)
            // if (resp.status === 200) {
            //     groups[idx].image = resp.data.image;
            // } else {
            //     let err;
            //     if (resp.data !== undefined && resp.data.message !== undefined)
            //         err = resp.data.message;
            //     else
            //         err = "Connection error";
            //     throw err
            // }
        }
        return groups
    }


    static async AddGroupMembers(groupId, members) {
        const resp = await Network.Post('/calendars/' + groupId + '/members', {members: members});
        // console.log('add', resp)
        if (resp.status === 200)
            return resp.data.calendar.members;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }


    static async GetGroupDetail(id) {
        const resp = await Network.Get('/calendars/' + id);
        if (resp.status === 200)
            return resp.data.calendar;
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
        const resp = await Network.Delete('/calendar/' + groupId + '/members/' + member_pseudo);
        if (resp.status === 200)
            return resp.data.group.members;
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

