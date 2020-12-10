import { loaderAction } from "../constant/appActionConstant/loaderAction"

export const showLoader = () => {
    return {
        type: loaderAction.SHOW_LOADER,

    };
};

export const hideLoader = () => {
    return {
        type: loaderAction.HIDE_LOADER,

    };
};


const loaderActions = {
    showLoader,
    hideLoader
};

export default loaderActions;
