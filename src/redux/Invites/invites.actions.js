import {arrayToObject} from "../../Utils/utils";

export const InvitesActionType = {
    Nothing: 'NOTHING',
    GetInvites: 'GET_INVITES',
    SetInvites: 'SET_INVITES',
    SetLoading: 'SET_LOADING_INVITES_001',
    ReplyGroupInvite: 'REPLY_GROUP_INVITE',
    ReplyEventInvite: 'REPLY_EVENT_INVITE',
    ReplyFriendInvite: 'REPLY_FRIEND_INVITE'

};

export const GetInvites = () => {
    return {
        type: InvitesActionType.GetInvites
    }
};

export const SetInvites = (invites) => {
    return {
        type: InvitesActionType.SetInvites,
        invites : invites
    }
};

export const SetLoading = (status) => {
    return {
        type: InvitesActionType.SetLoading,
        status
    }
};

export const ReplyGroupInvite = (group_id, response) => {
    return {
        type: InvitesActionType.ReplyGroupInvite,
        group_id,
        response
    }
};

export const ReplyEventInvite = (event_id, response) => {
    return {
        type: InvitesActionType.ReplyEventInvite,
        event_id,
        response
    }
};

export const ReplyFriendInvite = (user_id, response) => {
    return {
        type: InvitesActionType.ReplyFriendInvite,
        user_id,
        response
    }
};
