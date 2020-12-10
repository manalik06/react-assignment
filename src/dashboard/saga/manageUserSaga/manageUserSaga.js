import { takeLatest, call, put } from "redux-saga/effects"
import { manageUsers } from "../../constant/manageUserAction";
import alertToastActions from "../../../appActions/alertActions";
import loaderActions from "../../../appActions/loaderAction";
import { ApiPoint } from "../../../constant/ApiPoint";
import { manageUserApi } from "../../apis/manageUser";
import { ajax } from "../../../utils/ajax";
import { getUserListAction, getAdminUserListAction } from "../../actions/manageUsers/manageUsersAction";
// Bus logic

// Sub Routing
function* getUserListApi() {
    try {
        yield put(loaderActions.showLoader())
        let config = {
            url: ApiPoint + manageUserApi.getUserList,
            method: "get",

        }
        // yield put(loaderActions.hideLoader())
        let response = yield call(ajax, config)
        yield put(getUserListAction(response.data.users))
        yield put(loaderActions.hideLoader())



    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}

function* getAdminUserListApi() {
    try {
        yield put(loaderActions.showLoader())
        let config = {
            url:"https://randomuser.me/api/",
            method: "get",

        }
        let response = yield call(ajax, config)
        yield put(getAdminUserListAction(response.data.results))
        yield put(loaderActions.hideLoader())



    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
function* deleteUserApi({ data }) {
    try {
        yield put(loaderActions.showLoader())
        let config = {
            url: ApiPoint + manageUserApi.deleteUser + data.data.USER_ID,
            method: "DELETE",

        }
        // yield put(loaderActions.hideLoader())
        let response = yield call(ajax, config)
        yield put(getUserListAction(response.data.users))
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "success",
            message: response.data.message
        }))
        yield call(getUserListApi)
    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
function* addNewUserHadler({ obj }) {
    try {

        yield put(loaderActions.showLoader())
        let config = {
            data: obj.data
        }
        if (obj.data.userId) {
            config.url = ApiPoint + manageUserApi.addUser + "/"+obj.data.userId
            config.method = "PATCH"
        } else {
            config.url = ApiPoint + manageUserApi.addUser
            config.method = "POST"
        }

        let response = yield call(ajax, config)
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "success",
            message: response.data.message
        }))
        yield call(getUserListApi)

    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
// Watcher
export function* watcherGetUserList() {
    yield takeLatest(manageUsers.GET_USER_LIST, getUserListApi)
}
export function* watcherGetAdminUserList() {
    yield takeLatest(manageUsers.GET_ADMIN_USER_LIST, getAdminUserListApi)
}
export function* watcherDeleteUser() {
    yield takeLatest(manageUsers.DELETE_USER_ACTION, deleteUserApi)
}
export function* watcherAddNewUser() {
    yield takeLatest(manageUsers.ADD_USER_ACTION, addNewUserHadler)
}