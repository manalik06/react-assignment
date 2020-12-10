import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Button, Card, CardContent, Grid, FormControl,TextField } from "@material-ui/core";
import "../../css/manageRoll.scss"
import CommonTable from "../../common/table";
import alertToastActions from "../../../appActions/alertActions";
import { getRollsListSaga, deleteRollSaga, addNewRoleSaga, updateSelecteRow, changeRolePermissionSaga, saveRoleAndPermissionSaga, applyFilterSaga } from "../../actions/manageRolls/manageRollsAction";
import PromtModel from "../../common/promtModal";
import AddNewRoleModal from "./addNewRole";
class ManageRolls extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            deletePrompt: false,
            selectedRolls: undefined,
            addNewRoleModal: false,
            selectedRow: undefined,
            searchByCategoryName: "",
        }
    }
    handleOnChange(propName, e) {

        this.setState({
            [propName]: e.target.value
        })
      this.props.applyFilter(e.target.value)
    }
    render() {
        return (
            <div>
               
              
                {
                    this.state.addNewRoleModal && <AddNewRoleModal
                        openModal={this.state.addNewRoleModal}
                        closeModal={() => {
                            this.setState({
                                addNewRoleModal: false
                            })
                        }}
                        addHandler={(data) => {
                            this.props.addNewRoleApi(data)
                            this.setState({
                                addNewRoleModal: false
                            })

                        }}
                        isEditRole={this.state.isEditRole}
                        selectedRoll={this.state.selectedRolls}

                    />
                }
                <div className="product-search-category">
                      <TextField
                                    variant="outlined"
                                    required   size="small"
                                  
                                    name="roleCategory"
                                    label="Search by category"
                                    id="saerchCategory"                                  
                                    onChange={this.handleOnChange.bind(this, "searchByCategoryName")}
                                    value={this.state.searchByCategoryName}
                                    tabIndex="1"

                                />
                </div>
                <h3> Add Users </h3>

                <Button
                    variant="contained" color="primary"
                    onClick={() => {
                        this.setState({
                            isEditRole: false,
                            selectedRolls: undefined,
                            addNewRoleModal: true
                        })
                    }}
                >
                    Add New Role
                </Button>

                <Grid container spacing={2}
                    style={{ marginTop: "10px" }}
                >
                    <Grid item xs={8} md={8}>
                        <CommonTable
                            // onRowClick={this.onRowClick.bind(this)}
                            columns={this.props.manageRollsData.tableHeading || []}
                            rows={(this.props.manageRollsData.tableRows || [])}
                        />
                    </Grid>
                    

                </Grid>
            </div >
        )
    }
    componentDidMount() {
        this.props.getAllRolls()
    }

    // onRowClick(selectedRow) {
    //     this.setState({
    //         selectedRow: selectedRow,
    //         updatePermissionBtnColor: false
    //     })
    //     this.props.selectedRowUpdate(selectedRow)
    // }
    // deleteRoll(row) {
    //     this.setState({
    //         deletePrompt: true,
    //         selectedRolls: row
    //     })
    // }
   
    
}
const mapStateToProps = store => {
    return ({
        manageRollsData: store.manageRollsReducer.manageRolls
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
        getAllRolls: () => {
            dispatch(getRollsListSaga())
        },
       
        addNewRoleApi: (obj) => {
            dispatch(addNewRoleSaga(obj))
        },
        // selectedRowUpdate: (obj) => {
        //     dispatch(updateSelecteRow(obj))
        // },
        applyFilter: (obj) => {
            dispatch(applyFilterSaga(obj))
        },
       

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageRolls)