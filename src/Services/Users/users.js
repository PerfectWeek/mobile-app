import {Network} from "../../Network/Requests";
import {
    GetInfoFail,
    GetUserInfoSuccess,
    GetUserImage,
    UpdateUserInfoSuccess,
    UpdateUserInfoFail, UpdateUserImageSuccess, UpdateUserImageFail
} from "../../redux/User/user.actions";
import {Toast} from "native-base";
import {UpdateUserInfo} from "../../redux/Login/login.actions";
import {put} from "redux-saga/effects";

export class UserService {

    // static async GetGroupsForUserPseudo(pseudo) {
    //     const resp = await Network.Get('/users/' + pseudo + '/groups');
    //     if (resp.status === 200)
    //         return resp.data.groups;
    //     let err;
    //     if (resp.data !== undefined && resp.data.message !== undefined)
    //         err = resp.data.message;
    //     else
    //         err = "Connection error";
    //     throw err;
    // }

    static async GetUserImage(pseudo) {
        const resp = await Network.Get('/users/' + pseudo + '/image');
        if (resp.status === 200)
            return resp.data.image;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err
    }

    static async GetUsersImage(users) {
        for (let idx = 0; idx < users.length; idx++) {
            const resp = await Network.Get('/users/' + users[idx].pseudo + '/image');
            if (resp.status === 200) {
                users[idx].image = resp.data.image;
            } else {
                let err;
                if (resp.data !== undefined && resp.data.message !== undefined)
                    err = resp.data.message;
                else
                    err = "Connection error";
                throw err
            }
        }
        return users
    }

    static async GetUserInfo(pseudo) {
        const resp = await Network.Get('/users/' + pseudo);
        if (resp.status === 200)
            return resp.data.user;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err
    }

    static async GetUsersInfo(users) {
        for (let idx = 0; idx < users.length; idx++) {
            const resp = await Network.Get('/users/' + users[idx].pseudo);
            if (resp.status === 200) {
                users[idx] = resp.data.user;
            } else {
                let err;
                if (resp.data !== undefined && resp.data.message !== undefined)
                    err = resp.data.message;
                else
                    err = "Connection error";
                throw err
            }
        }
        return users
    }

    static async UpdateUserInfo(pseudo, new_pseudo) {
        const resp = await Network.Put('/users/' + pseudo, {pseudo: new_pseudo});
        if (resp.status === 200)
            return resp.data.user;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async UpdateUserImage(image_uri, pseudo) {
        const data = new FormData();
        data.append('image', {
            uri: image_uri,
            type: 'image/jpeg', // or photo.type
            name: 'UserProfilePicture'
        });
        const resp = await Network.PostMultiPart('/users/' + pseudo + '/upload-image', data);
        if (resp.status !== 200) {
            let err;
            if (resp.data !== undefined && resp.data.message !== undefined)
                err = resp.data.message;
            else
                err = "Connection error";
            throw err;
        }
    }
}