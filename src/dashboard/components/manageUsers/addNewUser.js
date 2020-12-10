import React, { PureComponent } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from "@material-ui/core/Grid"

import countryTelData from "country-telephone-data"
import validations from "../../../utils/inputFeilds";
import "../../css/addNewUser.scss"
class AddNewUser extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            emailId: "",
            mobileNo: "",
            countryCode: "91",
            userId:undefined,
            emailIdValidation: false,
            firstNameValidation: false,
            lastNameValidation: false,
            mobileNoValidation: false,
            countryCodeValidation: false,

        }
    }
    componentDidMount(){
       if(this.props.isEditUser){
           this.setEditUserData(this.props.selectedUser)
       }else{
           this.resetState()
       }
    }
    setEditUserData(selectedUser){
        this.setState({
            firstName:selectedUser.FIRST_NAME,
            lastName:selectedUser.LAST_NAME,
            emailId:selectedUser.EMAIL_ID,
            mobileNo:selectedUser.CONTACT,
            countryCode:selectedUser.COUNTRY_CODE,
            userId:selectedUser.USER_ID
        })
    }
    resetState(){
        this.setState({
            firstName:"",
            lastName:"",
            emailId:"",
            mobileNo:"",
            countryCode:"91",
            userId:undefined,
            emailIdValidation: false,
            firstNameValidation: false,
            lastNameValidation: false,
            mobileNoValidation: false,
            countryCodeValidation: false,
        })
    }
    render() {
        const { openUserModal, closeNewUserModal } = this.props
        const { userId,firstName, lastName, emailId, mobileNo, emailIdValidation, countryCode } = this.state
        const { allCountries } = countryTelData
        return (
            <div>
                <Dialog open={openUserModal} onClose={closeNewUserModal} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">  
                    {
                    userId !== undefined ?
                     "Edit User "
                     :
                     "Add New User"    
                    }</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName" 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    value={firstName}
                                    autoFocus
                                    onChange={this.updateFeilds.bind(this, "firstName")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="lastName"
                                    label="Last Name"
                                    id="lastName"
                                    autoComplete="lastName"
                                    onChange={this.updateFeilds.bind(this, "lastName")}
                                    value={lastName}
                                    tabIndex="1"

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="emailId"
                                    label="Email Id"
                                    name="emailId"
                                    autoComplete="emailId"
                                    tabIndex="2"
                                    onChange={this.updateFeilds.bind(this, "emailId")}
                                    value={emailId}
                                    error={emailIdValidation && true}
                                    disabled = {userId !== undefined ? true : false}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="outlined-select-currency-native"
                                            select
                                            fullWidth={true}
                                            label="Code"
                                            value={countryCode}
                                            onChange={this.updateFeilds.bind(this, "countryCode")}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            // helperText="Please select your currency"
                                            variant="outlined"
                                        // error={countryCodeValidation && true}
                                        >
                                            {/* <option value="91"> 91 </option> */}
                                            {allCountries.map((option) => (
                                                <option key={option.dialCode} value={option.dialCode}>
                                                    {`${option.dialCode}`}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            variant="outlined"
                                            type="number"

                                            fullWidth
                                            id="modileNo"
                                            label="Mobile No"
                                            name="modileNo"
                                            autoComplete="modileNo"
                                            tabIndex="3"
                                            onChange={this.updateFeilds.bind(this, "mobileNo")}
                                            value={mobileNo}
                                            maxLength="16"

                                        />
                                    </Grid>
                                </Grid>


                            </Grid>
                            <Grid item xs={7} sm={10}
                                className="text-right"
                            >
                                <Button onClick={closeNewUserModal} color="primary">
                                    Cancel
                                 </Button>
                            </Grid>
                            <Grid item xs={5} sm={2}
                                className="text-right"
                            >
                                <Button
                                    variant="contained"
                                    autoFocus
                                   color="primary"
                                    disabled={
                                        firstName
                                            === "" || lastName === "" || emailId === "" || emailIdValidation ? true : false
                                    }
                                    onClick={this.addNewUserHandler.bind(this)}
                                >
                                {
                                     userId !== undefined ? "Edit" : "Add"
                                }
                                    
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    updateFeilds(propName, e) {
        if (propName === "emailId") {
            let valid = validations.emailValidation(e.target.value)
            this.setState({
                [propName]: e.target.value,
                emailIdValidation: valid
            })
        } else {
            this.setState({
                [propName]: e.target.value
            })

        }

    }
    addNewUserHandler() {
        const {  firstName, lastName, emailId, emailIdValidation, firstNameValidation, lastNameValidation } = this.state
        if (firstName === "" || lastName === "" || emailId === "" || emailIdValidation === true || firstNameValidation || lastNameValidation) {
            if (firstName === "") {
                this.setState({ firstNameValidation: true })
            }
            if (lastName === "") {
                this.setState({ lastNameValidation: true })
            }
            if (emailId === "") {
                this.setState({ emailIdValidation: true })
            }

            return
        } else {
            const { firstName, lastName, emailId, mobileNo, countryCode,userId } = this.state
            var data = {
                first_name: firstName,
                last_name: lastName,
                email_id: emailId,
                contact: mobileNo,
                country_code: `+${countryCode}`,
                password: mobileNo,
                userId:userId || undefined

            };
            this.props.addNewUserHandler(data)
            // this.registrationApiCall()
        }
    }

}
export default AddNewUser