import { managePermissions } from "../../constant/managePermissinsAction";
// reducer action 

export const getAllPermissionsListAction = (list) =>{
    return{
        type:managePermissions.GET_ALL_PERMISSIONS_LIST_ACTION,
        value:list
    }
}

// export const getRoleAndPermissionById = (list) =>{
//     return{
//         type:manageRolls.GET_ROLE_PERMISSION_BY_ID_ACTION,
//         value:list
//     }
// }
// export const changeRolePermissionAction = (list) =>{
//     return{
//         type:manageRolls.CHANGE_ROLE_PERMISSION_ACTION,
//         value:list
//     }
// }
// Saga Action 
export const getAllPermissionsListSaga = () =>{
    return{
        type:managePermissions.GET_ALL_PERMISSIONS_LIST_SAGA
    }
}
export const deletePermissionSaga = (data) =>{
    return{
        type:managePermissions.DELETE_PERMISSION_SAGA,
        data
    }
}
export const addNewPermissionSaga = (obj) =>{
    return{
        type:managePermissions.ADD_NEW_PERMISSION_SAGA,
        obj
    }
}
