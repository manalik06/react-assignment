import React, { Component } from "react";
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
class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newPassword: "",
            confirmPassword: "",
            apiError: false,
            apiErrorMsg: "",
            severity: null
        }
    }
    render() {
        const { newPassword, confirmPassword,newPasswordValidation, confirmPasswordValidation, apiError, apiErrorMsg, severity } = this.state
        return (
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
                        Reset Password
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
                            onClick={this.resetPasswordHandler.bind(this)}
                            disabled={
                                newPassword === "" || confirmPassword === "" ? true : false
                            }
                        >

                            Reset Password
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
    resetPasswordHandler() {
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
                    newPasswordValidation: true
                })
                return
            } else {
                this.setState({
                    apiError: true,
                    apiErrorMsg: "Password  Match",
                    severity: "success"
                })
                this.props.history.push("/login")
            }

        }
    }
}
export default ResetPassword