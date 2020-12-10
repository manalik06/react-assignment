import {alertAction} from "../constant/appActionConstant/alertToast"

export const showToast = (data) => {
    return {
        type: alertAction.SHOW_TOAST,
        data: data
    };
};

export const hideToast = (data) => {
    return {
        type: alertAction.HIDE_TOAST,
        data: data
    };
};
export const resetToast = () => {
    return {
        type: alertAction.RESET_TOAST,        
    };
};


const alertToastActions = {
    showToast,
    hideToast,
    resetToast
};

export default alertToastActions;
