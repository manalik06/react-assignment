import React from "react"
// import { Loading } from "../../utils/loadingScreen/index";
// import Login from "../index";
const Login = React.lazy(() => import("../index"))
const Dashboard = React.lazy(() => import("../../dashboard/index.js"))
const CreatePassword = React.lazy(() => import("../components/createPassword/index"))
const ResetPassword = React.lazy(() => import("../components/resetPassword/index"))

const loginRoute = [
    {
        path: "/",
        // render: (props) => <React.Suspense fallback={<Loading />}> <Login {...props} /> </React.Suspense>,
        component:Login,
        exact: true,
        isPublic: true
    },
    {
        path: "/dashboard",
        // render: (props) => <React.Suspense fallback={<Loading />}> <Login {...props} /> </React.Suspense>,
        component:Dashboard,
        exact: true,
        isPublic: true
    },
    {
        path: "/create-password",
        // render: (props) => <React.Suspense fallback={<Loading />}> <CreatePassword {...props} /> </React.Suspense>,
        component:CreatePassword,
        exact: true,
        isPublic: true
    },
    {
        path: "/reset-password",
        // render: (props) => <React.Suspense fallback={<Loading />}> <ResetPassword {...props} /> </React.Suspense>,
        component:ResetPassword,
        exact: true,
        isPublic: true
    },
]
export default loginRoute