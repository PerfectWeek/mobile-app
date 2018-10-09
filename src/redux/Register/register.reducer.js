import {RegisterActionsType} from "./register.actions";

export const RegisterReducer = (state = {
    status: 'NONE'
}, action) => {
    switch (action.type) {
        case RegisterActionsType.Register:
            return {
                ...state,
                status: 'REGISTER'
            };
        case RegisterActionsType.RegisterSuccess:
            return {
                ...state,
                status: 'REGISTER_SUCCESS',
                access_token: action.access_token
            };
        case RegisterActionsType.RegisterFail:
            return {
                ...state,
                status: 'REGISTER_FAIL',
                error_message: action.error_message
            };
        default:
            return state;
    }
};
