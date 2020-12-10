import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LoginApiCall } from "./actions/loginAction"
import "./css/login.scss"
import {
    Container,
    CssBaseline,
    Paper,
    Avatar,
    Typography,
    Button,
    TextField,
    Grid,
    Checkbox,
    FormControlLabel,

} from '@material-ui/core';
// import { Alert } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import validations from "../utils/inputFeilds"
import AlertMessage from "../utils/alertMessage";
import alertToastActions from "../appActions/alertActions";
import "../appCss/alertToast.scss"
import AppLoader from "../utils/loader";

class Login extends Component {
    constructor() {
        super()
        this.state = {
            userName: "",
            password: "",
            userNameValidation: false,
            passwordValidation: false,

        }
    }
    render() {
        const { userName, password, userNameValidation, passwordValidation } = this.state
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
        console.log("this.props.history",this.props.history)
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
                                Login
                     </Typography>
                            <form noValidate
                                className="margin-top-10"

                            >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={this.updateFeilds.bind(this, "userName")}
                                    value={userName}
                                    error={userNameValidation && true}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.updateFeilds.bind(this, "password")}
                                    value={password}
                                    error={passwordValidation && true}
                                    onKeyPress={this.onKeyHandle.bind(this)}
                                />
                              

                                <Button

                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    classes={{
                                        root: "primary-background change-margin"
                                    }}
                                    onClick={this.loginHandler.bind(this)}
                                    disabled={
                                        userName === "" || password === "" || userNameValidation || passwordValidation ? true : false
                                    }
                                >

                                  LOG IN
                      </Button>
                               
                            </form>

                        </Paper>
                    </Container>
                </Container>
            </React.Fragment>
        )
    }
    updateFeilds(propName, e) {
        if (propName === "userName") {
            let valid = validations.emailValidation(e.target.value)
            this.setState({
                [propName]: e.target.value,
                userNameValidation: valid
            })
        } else {
            if (propName === "password") {

                if (e.target.value === "") {
                    this.setState({
                        [propName]: e.target.value,
                        passwordValidation: true
                    })
                } else {
                    let validPassword = validations.passwordValidation(e.target.value)
                    this.setState({
                        [propName]: e.target.value,
                        passwordValidation: validPassword
                    })
                }


            }

        }

    }

    onKeyHandle(e) {
        if (e.key === "Enter") {
            this.loginHandler();
        }
    }
    loginHandler() {
        const { userName, password, userNameValidation, passwordValidation } = this.state
        if (userName === "" || password === "" || userNameValidation === true || passwordValidation === true) {
            if (userName === "") {
                this.setState({ userNameValidation: true })
            }
            if (password === "") {
                this.setState({ passwordValidation: true })
            }
            if (userNameValidation) {
                return
            }
            if (passwordValidation) {
                return
            }
        } else {
            var data = {
                email_id: this.state.userName,
                password: this.state.password
            };
            this.props.history.push("/dashboard")
            // this.props.LoginApiCall({ data, history: this.props.history })
        }
    }
    componentWillUnmount() {
        this.props.resetToast()
    }
}
const mapStateToProps = store => {
    return ({
        alertToastReducer: store.alertToastReducer.toasts,
        loader: store.loaderReducer.loading
    })
}


const mapDispatchToProps = dispatch => {
    return {
        // Alert Toats
        closeAlert: (id) => {
            dispatch(alertToastActions.hideToast({ id }));
        },
        resetToast: () => {
            dispatch(alertToastActions.resetToast())
        },


        LoginApiCall: (obj) => {
            dispatch(LoginApiCall(obj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)