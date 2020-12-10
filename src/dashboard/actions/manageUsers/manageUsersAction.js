import { manageUsers } from "../../constant/manageUserAction";
// reducer action 

export const getUserListAction = (list) =>{
    return{
        type:manageUsers.GET_USER_LIST_ACTION,
        value:list
    }
}
export const getAdminUserListAction = (list) =>{
    return{
        type:manageUsers.GET_ADMIN_USER_LIST_ACTION,
        value:list
    }
}

// Saga Action 
export const getUserListSaga = () =>{
    return{
        type:manageUsers.GET_USER_LIST
    }
}
export const deleteUserSaga = (data) =>{
    return{
        type:manageUsers.DELETE_USER_ACTION,
        data
    }
}
export const addNewUserSaga = (obj) =>{
    return{
        type:manageUsers.ADD_USER_ACTION,
        obj
    }
}
export const getAdminUserListSaga =()=>{
    return{
        type:manageUsers.GET_ADMIN_USER_LIST
    }
}