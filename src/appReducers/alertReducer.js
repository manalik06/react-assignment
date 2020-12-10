import update from "immutability-helper";
import { alertAction } from "../constant/appActionConstant/alertToast"
const initialState = {
    toasts: []
};

const alertToastReducer = (state, action) => {

    let newState = state;

    if (typeof state === "undefined") {
        return initialState;
    }


    let toast = {};
    let filteredToasts;

    switch (action.type) {
        case alertAction.SHOW_TOAST:
            toast = {
                id: new Date().getTime(),
                type: action.data.type,
                message: action.data.message
            };
            newState = update(state, {
                toasts: {
                    $push: [toast]
                }
            });
            break;
        case alertAction.HIDE_TOAST:
            filteredToasts = state.toasts.filter((t) => {
                return t.id !== action.data.id;
            });
            newState = update(state, {
                toasts: {
                    $set: filteredToasts
                }
            });
            break;
        case alertAction.RESET_TOAST:
            newState = initialState
            break
        default:
            newState = state
    }

    return newState;
};
export default alertToastReducer