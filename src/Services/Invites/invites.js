import {Network} from "../../Network/Requests";

export class InvitesService {
    static async GetGroupInvites() {
        const resp = await Network.Get('/group-invites/');
        if (resp.status === 200)
            return resp.data.pending_invites;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async GetEventInvites() {
        const resp = await Network.Get('/event-invites/');
        if (resp.status === 200)
            return resp.data.pending_invites;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async GetFriendInvites() {
        const resp = await Network.Get('/friend-invites/');
        if (resp.status === 200)
            return resp.data.friend_requests;
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async ReplyGroupInvite(group_id, response) {
        const resp = await Network.Post(`/group-invites/${group_id}/${response ? 'accept-invite' : 'decline-invite'}`);
        if (resp.status === 200)
            return "ok";
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async ReplyFriendInvite(user_pseudo, response) {
        const resp = await Network.Post(`/friend-invites/${user_pseudo}/${response ? 'accept' : 'decline'}`);
        if (resp.status === 200)
            return "ok";
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }

    static async ReplyEventInvite(group_id, response) {
        const resp = await Network.Put(`/events/${group_id}/status`, {status: response ? 'going' : 'no'});
        if (resp.status === 200)
            return "ok";
        let err;
        if (resp.data !== undefined && resp.data.message !== undefined)
            err = resp.data.message;
        else
            err = "Connection error";
        throw err;
    }
}
