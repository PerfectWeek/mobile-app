export const UserActionsType = {
    GetInfo: 'GET_INFO',
    GetInfoSuccess: 'GET_INFO_SUCCESS',
    GetInfoFail: 'GET_INFO_FAIL'
};

export const GetInfo = (pseudo) => {
    return {
        type: UserActionsType.GetInfo,
        pseudo: pseudo
    }
};

export const GetInfoSuccess = (user_info) => {
    return {
        type: UserActionsType.GetInfoSuccess,
        user_info,
        error_message: null
    }
};

export const GetInfoFail= (error_message) => {
    return {
        type: UserActionsType.GetInfoFail,
        error_message: error_message
    }
};