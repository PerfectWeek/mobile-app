export const LoginActionsType = {
    Login: 'LOGIN',
    LoginSuccess: 'LOGIN_SUCCESS',
    LoginFail: 'LOGIN_FAIL'
};

export const Login = (email, password) => {
    return {
        type: LoginActionsType.Login,
        email: email,
        password: password
    }
};

export const LoginSuccess = (access_token, login_info) => {
    return {
        type: LoginActionsType.LoginSuccess,
        access_token,
        login_info : login_info,
        error_message: null
    }
};

export const LoginFail= (error_message) => {
    return {
        type: LoginActionsType.LoginFail,
        error_message: error_message
    }
};