import update from "immutability-helper"
import { managePermissions} from "../../constant/managePermissinsAction";
const managePermissionInitialState = {
    managePermissions: {
        tableHeading: [
            {
                id: 'PERM_NAME',
                label: 'Permission Name',
                minWidth: 170
            },
            {
                id: 'PERM_DESC',
                label: 'Permission Description',
                minWidth: 200
            },
            {
                id: 'EDIT',
                label: "Edit",
                minWidth: 50
            },
            {
                id: 'DELETE',
                label: "Delete",
                minWidth: 50
            },

        ],
        tableRows: [],
    }
}
const managePermissionsReducer = function (state = managePermissionInitialState, action) {
    let newState = state

    switch (action.type) {
        case managePermissions.GET_ALL_PERMISSIONS_LIST_ACTION:
            newState = update(state, {
                managePermissions: {
                    tableRows: { $set: action.value }
                }
            })
            break;
            default:
            newState = managePermissionInitialState

    }
    return newState
}
export default managePermissionsReducer;
