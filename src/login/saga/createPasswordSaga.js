import { takeLatest, call,put } from "redux-saga/effects"
import { createPossword } from "../constant/action";
import { ajax } from "../../utils/ajax";
import { ApiPoint } from "../../constant/ApiPoint"
import { createPassword } from "../api/loginApi"
import alertToastActions from "../../appActions/alertActions";
import loaderActions from "../../appActions/loaderAction";

// Bus Logic
// Sub Routing

function* createPasswordApiCall({ obj }) {
    try {  
        yield put(loaderActions.showLoader())  
        let config = {
                url: ApiPoint + createPassword.createPassword,
                method: "post",
                data:{
                    password:obj.password
                } 
            }
       let response = yield call(ajax, config)       
        yield put(loaderActions.hideLoader())   
        yield put(alertToastActions.showToast({
            type: "success",
            message: response.data.message
        }))    
        setTimeout(() => {
            obj.history.push("/login");
        }, 3000); 
        

    } catch (error) {
        yield put(loaderActions.hideLoader())  
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
// watcher

export function* createPasswordWatcher() {
    yield takeLatest(createPossword.CREATE_PASSWORD_API_CALL, createPasswordApiCall)
}