import update from "immutability-helper"
import { manageUsers } from "../../constant/manageUserAction";
const manageUserInitialState = {
    manageUsers: {
        tableHeading: [
            {
                id: 'FIRST_NAME',
                label: 'First Name',
                minWidth: 170
            },
            {
                id: 'LAST_NAME',
                label: 'Last Name',
                minWidth: 200
            },
            {
                id: 'ADD',
                label: "Address",
                minWidth: 50
            },
            {
                id: 'PHOTO',
                label: "Photo",
                minWidth: 50
            },
            {
                id: 'EMAIL',
                label: "Email Id",
                minWidth: 50
            },
            {
                id: 'DOB',
                label: "DOB",
                minWidth: 50
            },

        ],
        tableRows: []
    }
}
const manageUserReducer = function (state = manageUserInitialState, action) {
    let newState = state
    switch (action.type) {
            case manageUsers.GET_ADMIN_USER_LIST_ACTION:
            newState = update(state, {
                manageUsers: {
                    tableRows: { $set: action.value }
                }
            })
            break;
            default:
            newState = manageUserInitialState

    }
    return newState
}
export default manageUserReducer;
