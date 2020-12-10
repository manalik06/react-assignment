import React, { PureComponent } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from "@material-ui/core/Grid"


import validations from "../../../utils/inputFeilds";
import "../../css/addNewUser.scss"
class AddNewRoleModal extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            roleName: "",
            roleDesc: "",
            rolePrice:"",
            roleCategory:"",
            roleId:undefined,
            roleNameValidation: false,
            roleDescValidation: false,
          

        }
    }
    componentDidMount(){
       if(this.props.isEditRole){
           this.setEditUserData(this.props.selectedRoll)
       }else{
           this.resetState()
       }
    }
    setEditUserData(selectedRoll){
        this.setState({
            roleName:selectedRoll.ROLE_NAME,
            roleDesc:selectedRoll.ROLE_DESC,           
            roleId:selectedRoll.ROLE_ID
        })
    }
    resetState(){
        this.setState({
            roleName:"",
            roleDesc:"",
            rolePrice:"",
            roleCategory:"",
            roleId:undefined,
             roleNameValidation: false,
            roleDescValidation: false,
          
        })
    }
    render() {
        const { openModal, closeModal } = this.props
        const { roleName,roleDesc,roleDescValidation,roleNameValidation,roleId, rolePrice,roleCategory } = this.state
        
        return (
            <div>
                <Dialog open={openModal} onClose={closeModal} aria-labelledby="form-dialog-title"
                maxWidth={"sm"}
                >
                    <DialogTitle id="form-dialog-title">  
                    Add New Product
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="roleName" 
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="roleName"
                                    label="Product title"
                                    value={roleName}
                                    autoFocus
                                    onChange={this.updateFeilds.bind(this, "roleName")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="roleDesc"
                                    label="Product Description"
                                    id="roleDesc"                                  
                                    onChange={this.updateFeilds.bind(this, "roleDesc")}
                                    value={roleDesc}
                                    tabIndex="1"

                                />
                            </Grid>       
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="rolePrice"
                                    label="Product Price"
                                    id="rolePrice"                                  
                                    onChange={this.updateFeilds.bind(this, "rolePrice")}
                                    value={rolePrice}
                                    tabIndex="1"

                                />
                            </Grid>  
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="roleCategory"
                                    label="Product Category"
                                    id="roleCategory"                                  
                                    onChange={this.updateFeilds.bind(this, "roleCategory")}
                                    value={roleCategory}
                                    tabIndex="1"

                                />
                            </Grid>   

                           
                            <Grid item xs={7} sm={10}
                                className="text-right"
                            >
                                <Button onClick={closeModal} color="primary">
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
                                        roleName
                                            === "" || roleDesc === "" ||  roleDescValidation || roleNameValidation ? true : false
                                    }
                                    onClick={this.addNewRoleHandler.bind(this)}
                                >
                                {
                                     roleId !== undefined ? "Edit" : " Add"
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
        // if (propName === "emailId") {
        //     let valid = validations.emailValidation(e.target.value)
        //     this.setState({
        //         [propName]: e.target.value,
        //         emailIdValidation: valid
        //     })
        // } else {
            this.setState({
                [propName]: e.target.value
            })

        // }

    }
    addNewRoleHandler() {
        const {roleDesc,roleName,roleDescValidation,roleNameValidation} = this.state
        if (roleDesc === "" || roleName === "" || roleDescValidation === "" || roleNameValidation === true ) {
            if (roleName === "") {
                this.setState({ roleNameValidation: true })
            }
            if (roleDesc === "") {
                this.setState({ roleDescValidation: true })
            }
           

            return
        } else {
            const { roleDesc,roleName,roleId,rolePrice,roleCategory } = this.state
            var data = {
                // role_name: roleName,
                // role_desc: roleDesc,
                // roleId:roleId || undefined
                title: roleName,
                price: rolePrice,
                description: roleDesc,
                image: 'https://i.pravatar.cc',
                category:roleCategory
             
            };
            this.props.addHandler(data)
            // this.registrationApiCall()
        }
    }

}
export default AddNewRoleModal