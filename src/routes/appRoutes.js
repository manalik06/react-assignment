import React from 'react';
import { Provider } from "react-redux";
import store from "../store/appStore";
import { BrowserRouter, Switch } from 'react-router-dom';
import SubRoutes from "./subRoute";
import loginRoute from "../login/route/loginRoute";
// import registrationRoute from "../registration/route/registrationRoute";
import dashboardRoutes from "../dashboard/routes/dashboardRoutes"
import { Loading } from "../utils/loadingScreen/index"

class AppRouter extends React.Component {
    render() {
        let routeArr = loginRoute.concat(dashboardRoutes)
        return (
            <Provider store={store}>
                <React.Suspense fallback={<Loading />}>
                    <BrowserRouter >
                        <Switch>
                            {routeArr.map((item, key) => <SubRoutes key={key} {...item} />)}
                        </Switch>


                    </BrowserRouter>
                </React.Suspense>
            </Provider>

        );
    }
}

export default AppRouter;