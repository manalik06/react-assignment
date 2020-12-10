import { fork, all } from "redux-saga/effects";
import {LoginAPICallWarcher } from "./loginSaga"
import { createPasswordWatcher } from "./createPasswordSaga";
export default function* loginRootSaga() {
    yield all([        
        fork(LoginAPICallWarcher),
        fork(createPasswordWatcher)
    ])
}