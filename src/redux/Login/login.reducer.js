import {LoginActionsType} from "./login.actions";

export const LoginReducer = (state = {
    status: 'NONE'
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
                error_message: action.error_message
            };
        case LoginActionsType.LoginFail:
            return {
                ...state,
                status: LoginActionsType.LoginFail,
                error_message: action.error_message
            };
        case LoginActionsType.UpdateUserInfo:
            return {
                ...state,
                status: LoginActionsType.UpdateUserInfo,
                pseudo: action.pseudo,
                email: action.email
            };
        case LoginActionsType.Logout:
            return {
                ...state,
                status: 'NONE',
                access_token: null,
                pseudo: null,
                email: null,
                error_message: null
            };
        default:
            return state;
    }
};
