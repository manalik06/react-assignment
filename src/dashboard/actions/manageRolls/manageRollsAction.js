import { manageRolls } from "../../constant/manageRollsAction";
// reducer action 

export const getRollsListAction = (list) =>{
    return{
        type:manageRolls.GET_ROLLS_LIST_ACTION,
        value:list
    }
}

export const getRoleAndPermissionById = (list) =>{
    return{
        type:manageRolls.GET_ROLE_PERMISSION_BY_ID_ACTION,
        value:list
    }
}
export const changeRolePermissionAction = (list) =>{
    return{
        type:manageRolls.CHANGE_ROLE_PERMISSION_ACTION,
        value:list
    }
}
// Saga Action 
export const getRollsListSaga = () =>{
    return{
        type:manageRolls.GET_ROLLS_LIST_SAGA
    }
}
export const deleteRollSaga = (data) =>{
    return{
        type:manageRolls.DELETE_ROLL_ACTION,
        data
    }
}
export const addNewRoleSaga = (obj) =>{
    return{
        type:manageRolls.ADD_ROLL_ACTION,
        obj
    }
}
export const updateSelecteRow = (obj) =>{
    return{
        type:manageRolls.UPDATE_SELECTED_ROW_SAGA,
        obj
    }
}
export const changeRolePermissionSaga = (obj) =>{
    return{
        type:manageRolls.CHANGE_ROLE_PERMISSION_SAGA,
        obj
    }
}
export const saveRoleAndPermissionSaga = (obj) =>{
    return{
        type:manageRolls.SAVE_ROLE_PERMISSION_SAGA,
        obj
    }
}
export const applyFilterSaga = (obj) =>{
    return{
        type:manageRolls.APPLY_FILTERS_SAGA,
        obj
    }
}
