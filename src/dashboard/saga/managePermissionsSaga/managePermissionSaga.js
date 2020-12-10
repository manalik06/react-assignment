import { takeLatest, call, put } from "redux-saga/effects"
import { managePermissions } from "../../constant/managePermissinsAction";
import alertToastActions from "../../../appActions/alertActions";
import loaderActions from "../../../appActions/loaderAction";
import { ApiPoint } from "../../../constant/ApiPoint";
import { managePermissionApi } from "../../apis/managePermissions";
import { ajax } from "../../../utils/ajax";
import { getAllPermissionsListAction } from "../../actions/managePermissionsAction.js/managePermissionsAction";

// Bus logic

// Sub Routing
function* getAllPermissionApi() {
    try {
        yield put(loaderActions.showLoader())
        let config = {
            url: ApiPoint + managePermissionApi.getAllPermission,
            method: "get",

        }
        // yield put(loaderActions.hideLoader())
        let response = yield call(ajax, config)
        yield put(getAllPermissionsListAction(response.data.permissions))
        yield put(loaderActions.hideLoader())



    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
function* deletePermissionApiHandler({ data }) {
    try {
        yield put(loaderActions.showLoader())
        let config = {
            url: ApiPoint + managePermissionApi.deletePermission + data.PERM_ID,
            method: "DELETE",

        }
        // yield put(loaderActions.hideLoader())
        let response = yield call(ajax, config)
       
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "success",
            message: response.data.message
        }))
        yield call(getAllPermissionApi)
    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
function* addNewPermissionHadler({ obj }) {
    try {

        yield put(loaderActions.showLoader())
        let config = {
            data:obj
        }
        if (obj.permissionId) {
            config.url = ApiPoint + managePermissionApi.addNewPermission + "/"+obj.permissionId
            config.method = "PATCH"
        } else {
            config.url = ApiPoint + managePermissionApi.addNewPermission
            config.method = "POST"
        }

        let response = yield call(ajax, config)
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "success",
            message: response.data.message
        }))
        yield call(getAllPermissionApi)

    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
// Watcher
export function* watcherGetAllPermission() {
    yield takeLatest(managePermissions.GET_ALL_PERMISSIONS_LIST_SAGA, getAllPermissionApi)
}
export function* watcherDeletePermission() {
    yield takeLatest(managePermissions.DELETE_PERMISSION_SAGA, deletePermissionApiHandler)
}
export function* watcherAddNewPermission() {
    yield takeLatest(managePermissions.ADD_NEW_PERMISSION_SAGA, addNewPermissionHadler)
}