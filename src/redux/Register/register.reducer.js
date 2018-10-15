import {RegisterActionsType} from "./register.actions";

export const RegisterReducer = (state = {
    status: 'NONE'
}, action) => {
    switch (action.type) {
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
