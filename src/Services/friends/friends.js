import {Network} from "../../Network/Requests";

export class FriendsService {

    static async GetFriends() {
        const resp = await Network.Get(`/friends?invitation_status=mutual_friend`);
        if (resp.status === 200)
            return  [...resp.data.sent, ...resp.data.received];
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async SendFriendRequest(pseudo) {
        const resp = await Network.Post(`/friends/${pseudo}`);
        if (resp.status === 200)
            return 'ok';
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }
}
