import {  loginAction } from "../constant/action";

// Reducer action


export const LoginApiCall = (obj) => {
    return (
        {
            type: loginAction.LOGIN_API_CALL,
            obj
        }

    )
}