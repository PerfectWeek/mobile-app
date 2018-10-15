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
                login_info: action.login_info,
                error_message: action.error_message
            };
        case LoginActionsType.LoginFail:
            return {
                ...state,
                status: LoginActionsType.LoginFail,
                error_message: action.error_message
            };
        default:
            return state;
    }
};
