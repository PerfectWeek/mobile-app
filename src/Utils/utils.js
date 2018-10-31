export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * @return {boolean}
 */
export function validateNotEmpty(str) {
    if (str === "" || str === null || str === undefined)
        return false;
    return true;
}

export function validatePassword(psw) {
    var re = /^[a-zA-Z0-9_-]{2,31}$/;
    return re.test(String(psw).toLowerCase());
}
