import {FriendsActionType} from "./friends.actions";
import {LoginActionsType} from "../Login/login.actions";
import {InvitesActionType} from "../Invites/invites.actions";

const default_state = {status: 'NONE'};

export const FriendsReducer = (state = default_state, action) => {
    switch (action.type) {
        case LoginActionsType.ResetStores:
            return default_state;
        case FriendsActionType.SetFriends:
            return {
                ...state,
                friends: [...action.friends]
            };
        case FriendsActionType.SetLoading:
            return {
                ...state,
                loading: action.status
            };
        default:
            return state;
    }
};

