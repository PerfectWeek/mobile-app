import {RegisterActionsType} from "./register.actions";
import {LoginActionsType} from "../Login/login.actions";

const default_state = {status: 'NONE'};

export const RegisterReducer = (state = default_state, action) => {
    switch (action.type) {
        case LoginActionsType.ResetStores:
            return default_state;
        case RegisterActionsType.Register:
            return {
                ...state,
                status: RegisterActionsType.Register
            };
        case RegisterActionsType.RegisterSuccess:
            return {
                ...state,
                status: RegisterActionsType.RegisterSuccess,
                access_token: action.access_token
            };
        case RegisterActionsType.RegisterFail:
            return {
                ...state,
                status: RegisterActionsType.RegisterFail,
                error_message: action.error_message
            };
        default:
            return state;
    }
};
