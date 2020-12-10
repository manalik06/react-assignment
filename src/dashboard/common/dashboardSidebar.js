import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    ListSubheader
} from "@material-ui/core"

import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function DashboardSidebar(props) {
    const classes = useStyles();
 

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
          
            className={classes.root}
        >
           
            <ListItem button
            onClick={()=>{
                props.history.push("/dashboard/admin-users-list")
            }}
            >
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Users" />
            </ListItem>
            <ListItem button
            onClick={()=>{
                props.history.push("/dashboard/users-list")
            }}
            >
                <ListItemIcon>
                <LockOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Users List" />
            </ListItem>
         
           
        </List>
    );
}
export default withRouter(DashboardSidebar)