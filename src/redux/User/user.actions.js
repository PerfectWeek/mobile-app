export const UserActionsType = {
    GetInfo: 'GET_INFO',
    GetInfoSuccess: 'GET_INFO_SUCCESS',
    GetInfoFail: 'GET_INFO_FAIL',
    UpdateInfo: 'UPDATE_INFO',
    UpdateInfoSuccess: 'UPDATE_INFO_SUCCESS',
    UpdateInfoFail: 'UPDATE_INFO_FAIL',

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

export const UpdateInfo = (pseudo, new_pseudo) => {
    return {
        type: UserActionsType.UpdateInfo,
        pseudo: pseudo,
        new_pseudo: new_pseudo
    }
};

export const UpdateInfoSuccess = (user_info) => {
    return {
        type: UserActionsType.UpdateInfoSuccess,
        error_message: null,
        user_info,
    }
};

export const UpdateInfoFail= (error_message) => {
    return {
        type: UserActionsType.UpdateInfoFail,
        error_message: error_message
    }
};