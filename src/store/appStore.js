import { createStore, combineReducers, applyMiddleware } from "redux";
import { filterActions } from 'redux-ignore';
import createSagaMiddleware from 'redux-saga'

import {alertAction} from "../constant/appActionConstant/alertToast"
import {loaderAction} from "../constant/appActionConstant/loaderAction"
import {manageUsers} from "../dashboard/constant/manageUserAction"
import {manageRolls} from "../dashboard/constant/manageRollsAction"
import { managePermissions } from "../dashboard/constant/managePermissinsAction";
// Import All reducers here
import alertToastReducer from "../appReducers/alertReducer"
import loaderReducer from "../appReducers/loaderReducer";
import manageUserReducer from "../dashboard/reducers/manageUserReducer/manageUserReducer"
import manageRollsReducer from "../dashboard/reducers/manageRollsReducer/manageRollsReducer"
import managePermissionsReducer from "../dashboard/reducers/managePermissionsReducer/managePermissionsReducer"
import rootSaga from "../rootSaga/rootSaga";
const reducers = combineReducers({
    alertToastReducer:filterActions(alertToastReducer,[alertAction.SHOW_TOAST,alertAction.HIDE_TOAST,alertAction.RESET_TOAST]),
    loaderReducer:filterActions(loaderReducer,[loaderAction.SHOW_LOADER,loaderAction.HIDE_LOADER]),
    manageUserReducer:filterActions(manageUserReducer,[manageUsers.GET_USER_LIST_ACTION,manageUsers.GET_ADMIN_USER_LIST_ACTION,manageUsers.GET_USER_LIST,manageUsers.DELETE_USER_ACTION]),
    manageRollsReducer:filterActions(manageRollsReducer,[manageRolls.GET_ROLLS_LIST_ACTION,manageRolls.DELETE_ROLL_ACTION,manageRolls.ADD_ROLL_ACTION,manageRolls.GET_ROLE_PERMISSION_BY_ID_ACTION,manageRolls.CHANGE_ROLE_PERMISSION_ACTION]),
    managePermissionsReducer:filterActions(managePermissionsReducer,[managePermissions.GET_ALL_PERMISSIONS_LIST_ACTION]),

})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export default store
