import {UserActionsType} from "./user.actions";
import {GetGroupMembersSuccess, GroupsActionType} from "../Groups/groups.actions";
import {deepmerge} from "../../Utils/utils";
import {LoginActionsType} from "../Login/login.actions";

const default_state = {
    status: 'NONE',
    users: {}
};

export const UserReducer = (state = default_state, action) => {
    switch (action.type) {
        case LoginActionsType.ResetStores:
            return default_state;
        case UserActionsType.UserReset:
            return default_state;
        case UserActionsType.GetInfo:
            return {
                ...state,
                status: UserActionsType.GetInfo
            };
        case UserActionsType.SetUserInfo:
            return {
                ...state,
                users: deepmerge(state.users, {[action.user.pseudo]: action.user})
            };
        case UserActionsType.GetUserInfoSuccess:
            return {
                ...state,
                status: UserActionsType.GetUserInfoSuccess,
                error_message: action.error_message,
                users: deepmerge(state.users, {[action.user.pseudo]: action.user})
            };
        case UserActionsType.GetUserInfoFail:
            return {
                ...state,
                status: UserActionsType.GetUserInfoFail,
                error_message: action.error_message
            };
        case UserActionsType.GetUserImage:
            return {
                ...state,
                status: UserActionsType.GetUserImage
            };
        case UserActionsType.GetUserImageSuccess:
            state.users[action.pseudo].image = action.image;
            return {
                ...state,
                status: UserActionsType.GetUserImageSuccess,
                error_message: action.error_message,
                image: action.image,
                users: state.users
            };
        case UserActionsType.GetUserImageFail:
            return {
                ...state,
                status: UserActionsType.GetUserImageFail,
                error_message: action.error_message
            };

        case UserActionsType.UpdateUserInfo:
            return {
                ...state,
                status: UserActionsType.UpdateUserInfo
            };
        case UserActionsType.UpdateUserInfoSuccess:
            return {
                ...state,
                status: UserActionsType.UpdateUserInfoSuccess,
                error_message: action.error_message,
                users: {[action.user.pseudo]: action.user}
            };
        case UserActionsType.UpdateUserInfoFail:
            return {
                ...state,
                status: UserActionsType.UpdateUserInfoFail,
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
        case UserActionsType.UpdateUserImage:
            return {
                ...state,
                status: UserActionsType.UpdateUserImage
            };
        case UserActionsType.UpdateUserImageSuccess: {
            return {
                ...state,
                status: UserActionsType.UpdateUserImageSuccess,
                error_message: action.error_message,
                users: deepmerge(state.users, {[action.pseudo]: {image: action.image}})
            };
        }
        case UserActionsType.UpdateUserImageFail:
            return {
                ...state,
                status: UserActionsType.UpdateUserImageFail,
                error_message: action.error_message
            };
        case GroupsActionType.GetGroupMembersSuccess:
            // console.log(state.users);
            // console.log(action.members);
            // console.log(deepmerge(state.users === undefined ? {} : state.users, action.members));
            return {
                ...state,
                users: deepmerge(state.users, action.members)
            };

        default:
            return state;
    }
};
