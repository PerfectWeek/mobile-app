export const LoginActionsType = {
    SetLogged: 'SET_LOGGED',
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

export const SetLogged = (access_token, email, pseudo, id) => {
    return {
        type: LoginActionsType.SetLogged,
        access_token,
        email,
        id,
        pseudo
    }
};

export const LoginGoogle = (email, accessToken, name, id) => {
    return {
        type: LoginActionsType.LoginGoogle,
        pseudo : name,
        email,
        accessToken,
        id
    }
};

export const LoginSuccess = (access_token, pseudo, email, id) => {
    return {
        type: LoginActionsType.LoginSuccess,
        access_token,
        pseudo,
        email,
        id,
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
