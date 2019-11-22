import {LoginActionsType} from "./login.actions";
import {UserActionsType} from "../User/user.actions";
import {Analytics} from "expo-analytics";

export const LoginReducer = (state = {
    status: 'NONE',
    analytics : new Analytics('UA-143530568-2')
}, action) => {
    switch (action.type) {
        case LoginActionsType.Login:
            return {
                ...state,
                status: LoginActionsType.Login
            };
        case LoginActionsType.LoginSuccess:
            return {
                ...state,
                status: LoginActionsType.LoginSuccess,
                access_token: action.access_token,
                pseudo: action.pseudo,
                email: action.email,
                id: action.id,
                error_message: action.error_message
            };
        case LoginActionsType.LoginFail:
            return {
                ...state,
                status: LoginActionsType.LoginFail,
                error_message: action.error_message
            };
        case UserActionsType.UpdateUserInfoSuccess:
            return {
                ...state,
                pseudo: action.user.pseudo
            };
        case LoginActionsType.ResetStores:
            return {
                ...state,
                status: 'NONE',
                access_token: null,
                pseudo: null,
                email: null,
                id: null,
                error_message: null
            };
        case LoginActionsType.CheckIfLogged:
            return {
                ...state
            };
        default:
            return state;
    }
};
