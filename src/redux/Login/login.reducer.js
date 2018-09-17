import {LoginActionsType} from "./login.actions";

export const LoginReducer = (state = {
    status: 'NONE'
}, action) => {
    switch (action.type) {
        case LoginActionsType.Login:
            return {
                ...state,
                status: 'LOGIN'
            };
        case LoginActionsType.LoginSuccess:
            return {
                ...state,
                status: 'LOGGED',
                access_token: action.access_token
            };
        case LoginActionsType.LoginFail:
            return {
                ...state,
                status: 'LOGIN_FAIL'
            };
        default:
            return state;
    }
};
