import { fork, all } from "redux-saga/effects";
import loginRootSaga from "../login/saga/loginRootSaga"
// import registrationRootSaga from "../registration/saga/registrationRootSaga"
import dashboardRootSaga from "../dashboard/saga/dashboardRootSaga";
export default function* rootSaga() {
    yield all([
        fork(loginRootSaga),
        // fork(registrationRootSaga),
        fork(dashboardRootSaga)
    ])
}