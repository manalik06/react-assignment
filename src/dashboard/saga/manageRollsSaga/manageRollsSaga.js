import { takeLatest, call, put, select } from "redux-saga/effects"
import { manageRolls } from "../../constant/manageRollsAction";
import alertToastActions from "../../../appActions/alertActions";
import loaderActions from "../../../appActions/loaderAction";
import { ApiPoint } from "../../../constant/ApiPoint";
import { manageRollsApi } from "../../apis/manageRolls";
import { ajax } from "../../../utils/ajax";
import { getRollsListAction, getRoleAndPermissionById, changeRolePermissionAction } from "../../actions/manageRolls/manageRollsAction";
import * as selectors from "./manageRoleSelects";

// Bus logic

// Sub Routing
function* getAllRolls() {
    try {
        yield put(loaderActions.showLoader())
        let config = {
            url: 'https://fakestoreapi.com/products',
            method: "get",

        }
        let response = yield call(ajax, config)
        yield put(getRollsListAction(response.data))
        yield put(loaderActions.hideLoader())



    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
function* deleteRollApi({ data }) {
    try {
        yield put(loaderActions.showLoader())
        let config = {
            url: ApiPoint + manageRollsApi.deleteRoll + data.ROLE_ID,
            method: "DELETE",

        }
        yield put(loaderActions.hideLoader())
        let response = yield call(ajax, config)
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "success",
            message: response.data.message
        }))
        yield call(getAllRolls)
    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
function* addNewRoleApiHadler({ obj }) {
    try {

        yield put(loaderActions.showLoader())
        let config = {
            data: obj
        }
        // if (obj.roleId) {
        //     config.url = ApiPoint + manageRollsApi.addRoll + "/" + obj.roleId
        //     config.method = "PATCH"
        // } else {
            config.url = 'https://fakestoreapi.com/products'
            config.method = "POST"
        // }
        let response = yield call(ajax, config)
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "success",
            message: "Product Added sucessfully"
        }))
        yield call(getAllRolls)

    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
// function* updateSelectedRow({ obj }) {
//     try {
//         let allRoledata = Object.assign(yield select(selectors.getAllRoleData))

//         let newArr = []
//         allRoledata.map((data) => {
//             if (data.ROLE_ID === obj.ROLE_ID) {
//                 newArr.push({
//                     DELETE: data.DELETE,
//                     EDIT: data.EDIT,
//                     ROLE_DESC: data.ROLE_DESC,
//                     ROLE_ID: data.ROLE_ID,
//                     ROLE_NAME: data.ROLE_NAME,
//                     isRowSelected: true
//                 })
//             } else {
//                 newArr.push({
//                     DELETE: data.DELETE,
//                     EDIT: data.EDIT,
//                     ROLE_DESC: data.ROLE_DESC,
//                     ROLE_ID: data.ROLE_ID,
//                     ROLE_NAME: data.ROLE_NAME,
//                     isRowSelected: false
//                 })
//             }


//         })
//         yield put(getRollsListAction(newArr))
//         yield call(getSelecteRolePermission, { obj })

//     } catch (error) {

//         yield put(loaderActions.hideLoader())
//         yield put(alertToastActions.showToast({
//             type: "error",
//             message: error.errorMessage
//         }))
//     }
// }
function* getSelecteRolePermission({ obj }) {
    try {
        yield put(loaderActions.showLoader())
        let config = {
            method: "GET",
            url: ApiPoint + manageRollsApi.rollAndPermissionGetById + obj.ROLE_ID + "/permissions"
        }
        let response = yield call(ajax, config)

        yield put(getRoleAndPermissionById(response.data.permissions))

        yield put(loaderActions.hideLoader())
    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
function* updateRoleWisePermission({ obj }) {
    try {
        let allRoledata = JSON.parse(JSON.stringify(yield select(selectors.getAllRoleWisePermission)))
        let newArr = []
        allRoledata.map((permission) => {
            if (permission.PERM_ID === obj.PERM_ID) {
                permission.ASSIGNED_TO_ROLE = !permission.ASSIGNED_TO_ROLE
            }
            newArr.push(permission)
        })
        // yield put(changeRolePermissionAction(newArr))

    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
function* applyFilterHandler({obj}){
    try{
        yield put(loaderActions.showLoader())
        let config = {
            method: "GET",
            url:`https://fakestoreapi.com/products/category/${obj}`
        }
        let response = yield call(ajax, config)

        yield put(getRollsListAction(response.data))

        yield put(loaderActions.hideLoader())

    }
    catch(error){
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
function* saveRolePermissionHadler({ obj }) {
    try {
        let allRoledata = JSON.parse(JSON.stringify(yield select(selectors.getAllRoleWisePermission)))
        let data = []
        allRoledata.map((list) => {
            if (list.ASSIGNED_TO_ROLE === true) {
                data.push({
                    permission_name: list.PERM_NAME,
                    permission_id: list.PERM_ID
                })
            }
        })
        yield put(loaderActions.showLoader())
        let config = {
            method: "POST",
            url: ApiPoint + manageRollsApi.rollAndPermissionSave + obj.ROLE_ID +"/permissions",
            data:{
                Permissions:data
            }
        }
        let response = yield call(ajax, config)
        yield put(alertToastActions.showToast({
            type: "success",
            message: response.data.message
        }))

        yield put(loaderActions.hideLoader())
    } catch (error) {
        yield put(loaderActions.hideLoader())
        yield put(alertToastActions.showToast({
            type: "error",
            message: error.errorMessage
        }))
    }
}
// Watcher
export function* watcherGetAllRolls() {
    yield takeLatest(manageRolls.GET_ROLLS_LIST_SAGA, getAllRolls)
}
export function* watcherDeleteRoll() {
    yield takeLatest(manageRolls.DELETE_ROLL_ACTION, deleteRollApi)
}
export function* watcherAddNewRole() {
    yield takeLatest(manageRolls.ADD_ROLL_ACTION, addNewRoleApiHadler)
}
// export function* watcherUpdateSelectedRow() {
//     yield takeLatest(manageRolls.UPDATE_SELECTED_ROW_SAGA, updateSelectedRow)
// }
export function* watcherUpdateRoleWisePermission() {
    yield takeLatest(manageRolls.CHANGE_ROLE_PERMISSION_SAGA, updateRoleWisePermission)
}
export function* watcherSaveRoleAndPermission() {
    yield takeLatest(manageRolls.SAVE_ROLE_PERMISSION_SAGA, saveRolePermissionHadler)
}
export function* watcherApplyFilters() {
    yield takeLatest(manageRolls.APPLY_FILTERS_SAGA, applyFilterHandler)
}
