import React, { Component } from 'react';
import { Route,Redirect } from "react-router-dom";
import { withRouter } from "react-router";

class SubRoutes extends Component {
    render() {
        let routes = this.props;
        return (
            routes.isPublic === true? <Route
                path={routes.path}
                exact={routes.exact}
                render={props => (
                    <routes.component {...props}
                    //  routes={routes.routes} 
                     />
                )}
                // render={(props) =>  routes.render(props) }
            /> :
                <Route
                    path={routes.path}
                    exact={routes.exact}
                    render={
                        props =>
                        //  sessionStorage.getItem("userAuthToken") ? 
                        (
                        <routes.component {...props}
                         routes={routes.routes} 
                         />
                    ) 
                    // : 
                    //     <Redirect
                    //             to={{ pathname: "/login" }} />

                    }
                />
        )

    }
}
export default withRouter(SubRoutes)