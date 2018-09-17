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

export const LoginSuccess = (access_token) => {
    return {
        type: LoginActionsType.LoginSuccess,
        access_token,
    }
};

export const LoginFail= () => {
    return {
        type: LoginActionsType.LoginFail
    }
};