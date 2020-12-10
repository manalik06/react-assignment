import { takeLatest, call,put } from "redux-saga/effects"
import { loginAction } from "../constant/action";
import { ajax } from "../../utils/ajax";
import { ApiPoint } from "../../constant/ApiPoint"
import { LoginApi } from "../api/loginApi"
import alertToastActions from "../../appActions/alertActions";
import loaderActions from "../../appActions/loaderAction";

// Bus Logic
// Sub Routing

function* LoginCallHandler({ obj }) {
    try {  
    //     yield put(loaderActions.showLoader())  
    //     let config = {
    //             url: ApiPoint + LoginApi.login,
    //             method: "post",
    //             data: obj.data
    //         }
    //   let response =  yield call(ajax, config)
    //     yield put(loaderActions.hideLoader())  
    //     sessionStorage.setItem("userAuthToken", "Bearer " +response.data.access_token)
    //     obj.history.push("/dashboard")

    } catch (error) {
        yield put(loaderActions.hideLoader())  
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
// watcher

export function* LoginAPICallWarcher() {
    yield takeLatest(loginAction.LOGIN_API_CALL, LoginCallHandler)
}