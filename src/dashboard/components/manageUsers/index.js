import React, { PureComponent, lazy } from "react";
import { connect } from "react-redux";
import { getAdminUserListSaga } from "../../actions/manageUsers/manageUsersAction";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import alertToastActions from "../../../appActions/alertActions";
import { Button, Grid, Card, CardContent } from "@material-ui/core";
import "../../css/manageRoll.scss"
import AdminUserTable from "./adminUserTable";
const AddNewUser = lazy(() => import("./addNewUser"))
const PromtModel = lazy(() => import("../../common/promtModal"))


class UsersList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {


        }
    }
    onRowAdminClick(data) {
        let userdata =data
        this.props.history.push("/dashboard/users-details")
    }
    render() {
        return (
            <div>
                <Grid container spacing={2}>
                    <AdminUserTable
                        onRowClick={this.onRowAdminClick.bind(this)}
                        columns={this.props.manageUserData.tableHeading || []}
                        // onRowDelete={this.onRowDelete.bind(this)}
                        rows={(this.props.manageUserData.tableRows || [])}
                    />
                </Grid>

            </div>
        )
    }





    componentDidMount() {
        this.props.getAdminUserList()
    }
}
const mapStateToProps = store => {
    return ({
        // alertToastReducer: store.alertToastReducer.toasts,
        // loader: store.loaderReducer.loading
        manageUserData: store.manageUserReducer.manageUsers
    })
}


const mapDispatchToProps = dispatch => {
    return {
        closeAlert: (id) => {
            dispatch(alertToastActions.hideToast({ id }));
        },
        resetToast: () => {
            dispatch(alertToastActions.resetToast())
        },

        getAdminUserList: () => {
            dispatch(getAdminUserListSaga())
        },
        showToast: (obj) => {
            dispatch(alertToastActions.showToast(obj));
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
