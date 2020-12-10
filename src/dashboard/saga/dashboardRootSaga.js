import { fork, all } from "redux-saga/effects";
import { watcherGetUserList, watcherDeleteUser, watcherAddNewUser, watcherGetAdminUserList } from "./manageUserSaga/manageUserSaga";
import { watcherGetAllRolls, watcherDeleteRoll, watcherAddNewRole, watcherUpdateSelectedRow, watcherUpdateRoleWisePermission, watcherSaveRoleAndPermission, watcherApplyFilters } from "./manageRollsSaga/manageRollsSaga";
import { watcherGetAllPermission, watcherAddNewPermission, watcherDeletePermission } from "./managePermissionsSaga/managePermissionSaga";
;
export default function* dashboardRootSaga() {
    yield all([        
        fork(watcherGetUserList),
        fork(watcherGetAdminUserList),
        fork(watcherDeleteUser),
        fork(watcherAddNewUser),
        fork(watcherGetAllRolls),
        fork(watcherDeleteRoll),
        fork(watcherAddNewRole),
        // fork(watcherUpdateSelectedRow),
        fork(watcherUpdateRoleWisePermission),
        fork(watcherSaveRoleAndPermission),
        fork(watcherApplyFilters),
        fork(watcherGetAllPermission),
        fork(watcherAddNewPermission),
        fork(watcherDeletePermission)
    ])
}