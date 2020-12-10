import update from "immutability-helper"
import { manageRolls } from "../../constant/manageRollsAction";
const manageRollsInitialState = {
    manageRolls: {
        tableHeading: [
            {
                id: 'PRODUCT_TITLE',
                label: 'Product Title',
                minWidth: 170
            },
            {
                id: 'PRODUCT_DESC',
                label: 'Product Description',
                minWidth: 200
            },
            {
                id: 'PRICE',
                label: "Product Price",
                minWidth: 50
            },
            {
                id: 'CATEGORY',
                label: "Product Category",
                minWidth: 50
            },
            {
                id: 'DELETE',
                label: "Delete",
                minWidth: 50
            },

        ],
        tableRows: [],
        rolesAndPermission: []

    }

}
const manageRollsReducer = function (state = manageRollsInitialState, action) {
    let newState = state

    switch (action.type) {
        case manageRolls.GET_ROLLS_LIST_ACTION:
            newState = update(state, {
                manageRolls: {
                    tableRows: { $set: action.value }
                }
            })
            break;
        case manageRolls.GET_ROLE_PERMISSION_BY_ID_ACTION:
            newState = update(state, {
                manageRolls: {
                    rolesAndPermission: { $set: action.value }
                }
            })
            break;
        case manageRolls.CHANGE_ROLE_PERMISSION_ACTION:
            newState = update(state, {
                manageRolls: {
                    rolesAndPermission: { $set: action.value }
                }
            })
            break;
        default:
            newState = manageRollsInitialState

    }
    return newState
}
export default manageRollsReducer;
