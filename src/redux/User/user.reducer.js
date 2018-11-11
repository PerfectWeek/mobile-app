import {UserActionsType} from "./user.actions";

export const UserReducer = (state = {
    status: 'NONE'
}, action) => {
    switch (action.type) {
        case UserActionsType.UserReset:
            return {
                ...state,
                status: 'NONE',
                error_message: null,
                user_info: null
            };
        case UserActionsType.GetInfo:
            return {
                ...state,
                status: UserActionsType.GetInfo
            };
        case UserActionsType.GetInfoSuccess:
            return {
                ...state,
                status: UserActionsType.GetInfoSuccess,
                error_message: action.error_message,
                user_info: action.user_info
            };
        case UserActionsType.GetInfoFail:
            return {
                ...state,
                status: UserActionsType.GetInfoFail,
                error_message: action.error_message
            };
        case UserActionsType.UpdateInfo:
            return {
                ...state,
                status: UserActionsType.UpdateInfo
            };
        case UserActionsType.UpdateInfoSuccess:
            return {
                ...state,
                status: UserActionsType.UpdateInfoSuccess,
                error_message: action.error_message,
                user_info: action.user_info
            };
        case UserActionsType.UpdateInfoFail:
            return {
                ...state,
                status: UserActionsType.UpdateInfoFail,
                error_message: action.error_message
            };
        case UserActionsType.DeleteUser:
            return {
                ...state,
                pseudo: action.pseudo,
                status: UserActionsType.DeleteUser
            };
        case UserActionsType.DeleteUserSuccess:
            return {
                ...state,
                status: UserActionsType.DeleteUserSuccess,
                error_message: action.error_message,
            };
        case UserActionsType.DeleteUserFail:
            return {
                ...state,
                status: UserActionsType.DeleteUserFail,
                error_message: action.error_message
            };
        default:
            return state;
    }
};
