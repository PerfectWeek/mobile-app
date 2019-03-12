export const LoginActionsType = {
    Login: 'LOGIN',
    LoginSuccess: 'LOGIN_SUCCESS',
    LoginFail: 'LOGIN_FAIL',
    LoginGoogle: 'LOGIN_GOOGLE',
    UpdateUserInfo: 'UPDATE_USER_INFO',
    Logout: 'LOGOUT',
    CheckIfLogged: "CHECK_IF_LOGGED",
    ResetStores : 'RESET_STORES'
};

export const Login = (email, password) => {
    return {
        type: LoginActionsType.Login,
        email: email,
        password: password
    }
};

export const LoginGoogle = (email, accessToken, name) => {
    return {
        type: LoginActionsType.LoginGoogle,
        name,
        email,
        accessToken
    }
};

export const LoginSuccess = (access_token, pseudo, email) => {
    return {
        type: LoginActionsType.LoginSuccess,
        access_token,
        pseudo,
        email,
        error_message: null
    }
};

export const LoginFail = (error_message) => {
    return {
        type: LoginActionsType.LoginFail,
        error_message: error_message
    }
};

export const Logout = () => {
    return {
        type: LoginActionsType.Logout
    }
};

export const ResetStores = () => {
    return {
        type: LoginActionsType.ResetStores
    }
};


export const CheckIfLogged = () => {
    return {
        type: LoginActionsType.CheckIfLogged
    }
};