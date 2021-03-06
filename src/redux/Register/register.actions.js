export const RegisterActionsType = {
    Register: 'REGISTERING',
    RegisterSuccess: 'REGISTER_SUCCESS',
    RegisterOk: 'REGISTER_OK',
    RegisterFail: 'REGISTER_FAIL'
};

export const Register = (username, email, password) => {
    return {
        type: RegisterActionsType.Register,
        username: username,
        email: email,
        password: password
    }
};

export const RegisterOk = () => {
    return {
        type: RegisterActionsType.RegisterOk,
    }
};

export const RegisterSuccess = () => {
    return {
        type: RegisterActionsType.RegisterSuccess,
        error_message: null
    }
};

export const RegisterFail= (error_message) => {
    return {
        type: RegisterActionsType.RegisterFail,
        error_message: error_message
    }
};
