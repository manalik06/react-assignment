import {  createPossword } from "../constant/action";

// Reducer action


export const createPaasowrdSaga = (obj) => {
    return (
        {
            type: createPossword.CREATE_PASSWORD_API_CALL,
            obj
        }

    )
}