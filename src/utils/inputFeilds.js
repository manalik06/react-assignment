const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{4,16}$/;
function emailValidation(value) {
    if (value === "") {
        return null;
    } else if (emailRegex.test(value)) {
        return false;
    } else if (!(emailRegex.test(value))) {
        return true;
    }
}
function passwordValidation(value) {
    if (value === "") {
        return null;
    } else if (passwordRegex.test(value)) {

        return false;
    } else if (!(passwordRegex.test(value))) {
        return true;
    }
}

const validations = {
    emailValidation,
    passwordValidation
};
export default validations;