import {arrayToObject} from "../../Utils/utils";
import {InvitesActionType} from "../Invites/invites.actions";

export const FriendsActionType = {
    Nothing: 'NOTHING',
    GetFriends: 'GetFriends',
    SetFriends: 'SetFriends',
    SendFriendRequest: 'SendFriendRequest',
    SetLoading: 'SET_LOADING_FRIEND_001',
};

export const GetFriends = () => {
    return {
        type: FriendsActionType.GetFriends
    }
};

export const SetFriends = (friends) => {
    return {
        type: FriendsActionType.SetFriends,
        friends
    }
};

export const SendFriendRequest = (pseudos) => {
    return {
        type: FriendsActionType.SendFriendRequest,
        pseudos
    }
};

export const SetLoading = (status) => {
    return {
        type: FriendsActionType.SetLoading,
        status
    }
};
