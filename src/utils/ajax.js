import axios from 'axios';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const DEFAULT_HEADERS = {
    // Add default application type / content type if required
};

const _processError = function (error) {
    let processedErrors = {
        errorCode: null,
        errorMessage: null

    };
    if (error.response) {
        if (typeof (error.response.data) === "object") {
            // if (error.response.status) {
            //     if (error.response.status === 401) {
            //         history.replace("/registration")
            //         window.location.reload()
            //         // return
            //     }
            // }
            processedErrors.errorCode = error.response.status
            processedErrors.errorMessage = error.response.data.message || error.response.statusText 

        }
    }
    return processedErrors;
};


const ajax = function (config) {
    let finalConfig = {
        headers: {
            "Authorization": sessionStorage.getItem("userAuthToken") || ""
        }
    };

    Object.assign(finalConfig, config);
    Object.assign(finalConfig.headers, DEFAULT_HEADERS, config.headers || {});

    return new Promise((resolve, reject) => {
        axios(finalConfig).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(_processError(error));
        });
    });
};

export {
    ajax
};