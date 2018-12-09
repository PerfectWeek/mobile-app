export const LoginActionsType = {
    Login: 'LOGIN',
    LoginSuccess: 'LOGIN_SUCCESS',
    LoginFail: 'LOGIN_FAIL',
    UpdateUserInfo: 'UPDATE_USER_INFO',
    Logout: 'LOGOUT',
    CheckIfLogged: "CHECK_IF_LOGGED"
};

export const Login = (email, password) => {
    return {
        type: LoginActionsType.Login,
        email: email,
        password: password
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

export const UpdateUserInfo = (pseudo, email) => {
    return {
        type: LoginActionsType.UpdateUserInfo,
        pseudo,
        email,
    }
};

export const Logout = () => {
    return {
        type: LoginActionsType.Logout
    }
};

export const CheckIfLogged = () => {
    return {
        type: LoginActionsType.CheckIfLogged
    }
};