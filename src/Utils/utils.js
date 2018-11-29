export function validateEmail(email) {
    if (email === '')
        return true;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * @return {boolean}
 */
export function validateNotEmpty(str) {
    return !(str === "" || str === null || str === undefined);
}

export function validatePassword(psw) {
    if (psw === '')
        return true;
    var re = /^[a-zA-Z0-9_-]{2,31}$/;
    return re.test(String(psw).toLowerCase());
}

export function comparePasswords(pwd1, pwd2) {
    return pwd1 === pwd2;
}
