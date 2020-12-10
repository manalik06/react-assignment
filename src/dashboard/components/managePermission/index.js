import React, { lazy, PureComponent } from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import CommonTable from "../../common/table";
import { Button, Grid, Typography, Card, CardContent } from "@material-ui/core";
import alertToastActions from "../../../appActions/alertActions";
// const useStyles = makeStyles({
//     root: {
//       minWidth: 275,
//     },
//     bullet: {
//       display: 'inline-block',
//       margin: '0 2px',
//       transform: 'scale(0.8)',
//     },
//     title: {
//       fontSize: 14,
//     },
//     pos: {
//       marginBottom: 12,
//     },
//   });
class ManagePermissions extends PureComponent {

    render() {
        console.log("manageUserData-->", this.props.manageUserData)
        // const classes = useStyles();
        let data = this.props.manageUserData.tableRows
        return (
            <div>
                {
                    data.map((data) => {
                        return (<Card variant="outlined">
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    {+ "." + data.name.first + " " + data.name.last}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {data.location.street.number + " " + data.location.street.name + " " + data.location.city + "," + data.location.state + "," + data.location.country}
                                </Typography>
                                <Typography color="textSecondary">
                                    {data.phone}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {data.email}

                                </Typography>
                            </CardContent>

                        </Card>

                        )
                    })


                }
            </div>
        )
    }



}
const mapStateToProps = store => {
    return ({

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


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagePermissions)
