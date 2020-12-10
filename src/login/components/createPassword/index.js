import React, { Component } from "react";
import { connect } from "react-redux";
import "../../../appCss/alertToast.scss"
import {
    Container,
    CssBaseline,
    Paper,
    Avatar,
    Typography,
    Button,
    Grid,
    TextField,


} from "@material-ui/core";
import { Link } from "react-router-dom"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from '@material-ui/lab';
import "../../css/login.scss"
import validations from "../../../utils/inputFeilds";
import alertToastActions from "../../../appActions/alertActions";
import { createPaasowrdSaga } from "../../actions/createPasswordAction";
import AlertMessage from "../../../utils/alertMessage";
import AppLoader from "../../../utils/loader";
class CreatePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPassword: "",
            confirmPassword: "",
            newPasswordValidation: false,
            confirmPasswordValidation: false,
            apiError: false,
            apiErrorMsg: "",
            severity: null
        }
    }
    render() {
        const { newPassword, confirmPassword, newPasswordValidation, confirmPasswordValidation, apiError, apiErrorMsg, severity } = this.state
        const alertMessage = this.props.alertToastReducer.map((list, key) => {
            return (
                <AlertMessage
                    type={list.type}
                    key={key}
                    message={list.message}
                    id={list.id}
                    closeAlert={this.props.closeAlert} />

            )
        })
        return (

            <React.Fragment>
                <AppLoader
                    loader={this.props.loader}
                />
                <Container component="main" maxWidth="md"
                    classes={{
                        root: "white-background"
                    }}
                >

                    <div className="alert-toast">
                        {

                            alertMessage
                        }
                    </div>

                    <Container component="main" maxWidth="xs"
                        classes={{
                            root: "white-background"
                        }}
                    >
                        <CssBaseline />
                        <Paper elevation={0}
                            className="center-text margin-top-50"
                        >
                            <Avatar
                                classes={{
                                    root: "primary-background"
                                }}
                            >
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5"
                            >
                                Create Password
                     </Typography>
                            <form noValidate
                                className="margin-top-10"

                            >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    id="newPassword"
                                    tabIndex={0}
                                    autoComplete="current-new-password"
                                    onChange={this.updateFeilds.bind(this, "newPassword")}
                                    value={newPassword}
                                    error={newPasswordValidation && true}

                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    tabIndex={1}
                                    id="confirmPassword"
                                    autoComplete="current-new-password"
                                    onChange={this.updateFeilds.bind(this, "confirmPassword")}
                                    value={confirmPassword}
                                    error={confirmPasswordValidation && true}
                                    onKeyPress = {this.onKeyHandle.bind(this)}

                                />
                                {

                                    apiError &&
                                    <Alert severity={severity}> {apiErrorMsg}</Alert>
                                }

                                <Button
                                    // type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    // className={classes.submit}
                                    classes={{
                                        root: "primary-background change-margin"
                                    }}
                                    onClick={this.createPasswordHandler.bind(this)}
                                    disabled={
                                        newPassword === "" || confirmPassword === "" ? true : false
                                    }
                                >

                                    Create Password
                      </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link to="/login" variant="body2">
                                            Back to Login
                                </Link>
                                    </Grid>
                                </Grid>
                            </form>

                        </Paper>
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
    updateFeilds(propName, e) {

        if (propName === "newPassword") {
            this.setState({
                [propName]: e.target.value,
                newPasswordValidation: false

            })
        } else {
            this.setState({
                [propName]: e.target.value,
                confirmPasswordValidation: false

            })
        }


    }
    onKeyHandle(e){
        if (e.key === "Enter") {
            this.createPasswordHandler();
        }
    }
    createPasswordHandler() {
        const { newPassword, confirmPassword } = this.state
        if (newPassword !== confirmPassword) {
            this.setState({
                apiError: true,
                apiErrorMsg: "Password Not Match",
                severity: "warning",
                confirmPasswordValidation: true,
                newPasswordValidation: true
            })
            return
        } else {
            if (validations.passwordValidation(newPassword)) {
                this.setState({
                    apiError: true,
                    apiErrorMsg: "Password should have at least 5 characters with a combination of number,alphabets and one symbol.",
                    severity: "warning",
                    // confirmPasswordValidation: true,
                    newPasswordValidation: true

                })
                return
            } else {   
                this.setState({
                    apiError: false,
                    apiErrorMsg: "",
                    severity: "success",
                    // confirmPasswordValidation: true,
                  

                })            
                let data = {
                    password: newPassword,
                    history: this.props.history
                }
                this.props.createPaasowrdApiCall(data)
            }

        }
    }
    componentWillUnmount() {
        this.props.resetToast()
    }
    componentDidMount() {
        let url = window.location.href
        let token = url.split("?")[1].split("=")[1]
        sessionStorage.setItem("userAuthToken", "Bearer " + token)

    }
}
const mapStateToProps = store => ({
    alertToastReducer: store.alertToastReducer.toasts,
    loader: store.loaderReducer.loading
})

const mapDispatchToProps = dispatch => {
    return {
        closeAlert: (id) => {
            dispatch(alertToastActions.hideToast({ id }));
        },
        resetToast: () => {
            dispatch(alertToastActions.resetToast())
        },
        createPaasowrdApiCall: (obj) => {
            dispatch(createPaasowrdSaga(obj))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePassword)