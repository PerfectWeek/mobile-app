import {InvitesActionType, SetLoading} from "./invites.actions";
import {LoginActionsType} from "../Login/login.actions";

const default_state = {status: 'NONE'};

export const InvitesReducer = (state = default_state, action) => {
    switch (action.type) {
        case LoginActionsType.ResetStores:
            return default_state;
        case InvitesActionType.SetInvites:
            return {
                ...state,
                invites: action.invites
            };
        case InvitesActionType.SetLoading:
            return {
                ...state,
                loading: action.status
            };
        default:
            return state;
    }
};

