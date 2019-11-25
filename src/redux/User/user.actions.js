export const UserActionsType = {
    SetUserInfo: 'SET_USER_INFO',
    GetUsersInfo: 'GET_USERS_INFO',
    GetUserInfo: 'GET_USER_INFO',
    GetUserInfoSuccess: 'GET_INFO_SUCCESS',
    GetUserInfoFail: 'GET_INFO_FAIL',
    UpdateUserInfo: 'UPDATE_USER_INFO',
    UpdateUserInfoSuccess: 'UPDATE_USER_INFO_SUCCESS',
    UpdateUserInfoFail: 'UPDATE_USER_INFO_FAIL',
    DeleteUser: 'DELETE_USER',
    DeleteUserSuccess: 'DELETE_USER_SUCCESS',
    DeleteUserFail: 'DELETE_USER_FAIL',
    GetUserImage: 'GET_USER_IMAGE',
    GetUserImageSuccess: 'GET_USER_IMAGE_SUCCESS',
    GetUserImageFail: 'GET_USER_IMAGE_FAIL',
    UpdateUserImage: 'UPDATE_USER_IMAGE',
    UpdateUserImageSuccess: 'UPDATE_USER_IMAGE_SUCCESS',
    UpdateUserImageFail: 'UPDATE_USER_IMAGE_FAIL',
};

export const SetUserInfo = (user) => {
    return {
        type: UserActionsType.GetUserInfoSuccess,
        user
    }
};

export const GetUserInfo = (pseudo) => {
    return {
        type: UserActionsType.GetUserInfo,
        pseudo: pseudo
    }
};

export const GetUsersInfo = (users) => {
    return {
        type: UserActionsType.GetUsersInfo,
        users
    }
};
export const GetUserInfoSuccess = (user) => {
    return {
        type: UserActionsType.GetUserInfoSuccess,
        user,
        error_message: null
    }
};

export const GetUserInfoFail = (error_message) => {
    return {
        type: UserActionsType.GetUserInfoFail,
        error_message: error_message
    }
};

export const GetUserImage = (pseudo) => {
    return {
        type: UserActionsType.GetUserImage,
        pseudo: pseudo
    }
};

export const GetUserImageSuccess = (image) => {
    return {
        type: UserActionsType.GetUserImageSuccess,
        image,
        error_message: null
    }
};

export const GetUserImageFail = (error_message) => {
    return {
        type: UserActionsType.GetUserImageFail,
        error_message: error_message
    }
};


export const UpdateUserInfo = (email, new_pseudo) => {
    return {
        type: UserActionsType.UpdateUserInfo,
        email,
        new_pseudo
    }
};

export const UpdateUserInfoSuccess = (user) => {
    return {
        type: UserActionsType.UpdateUserInfoSuccess,
        error_message: null,
        user,
    }
};

export const UpdateUserInfoFail = (error_message) => {
    return {
        type: UserActionsType.UpdateUserInfoFail,
        error_message: error_message
    }
};

export const DeleteUser = (pseudo) => {
    return {
        type: UserActionsType.DeleteUser,
        pseudo: pseudo
    }
};

export const DeleteUserSuccess = () => {
    return {
        type: UserActionsType.DeleteUserSuccess,
        error_message: null
    }
};

export const DeleteUserFail = (error_message) => {
    return {
        type: UserActionsType.DeleteUserFail,
        error_message: error_message
    }
};


export const UpdateUserImage = (id, image) => {
    return {
        type: UserActionsType.UpdateUserImage,
        id,
        image
    }
};

export const UpdateUserImageSuccess = (image, id) => {
    return {
        type: UserActionsType.UpdateUserImageSuccess,
        error_message: null,
        image,
        id
    }
};

export const UpdateUserImageFail = (error_message) => {
    return {
        type: UserActionsType.UpdateUserImageFail,
        error_message: error_message
    }
};
