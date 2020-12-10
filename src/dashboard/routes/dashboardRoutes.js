import { lazy } from "react";
const Dashboard = lazy(() => import("../index"))
const UsersList = lazy(() => import("../components/manageUsers/index"))
const ManageRolls = lazy(()=> import("../components/manageRolls/index"))
const ManagePermissions = lazy(()=> import("../components/managePermission/index"))
const dashboardRoutes = [{
    path: "/dashboard",
    component: Dashboard,
 
    isPublic: false,  
    routes:[      
       
        {
            path: "/dashboard/admin-users-list",
            component: UsersList,
            exact: true, 
            isPublic: false
        },
        {
            path: "/dashboard/users-list",
            component: ManageRolls,
            exact: true, 
            isPublic: false
        },
        {
            path: "/dashboard/users-details",
            component: ManagePermissions,
            exact: true, 
            isPublic: false
        },
        
     


    ] 

},


]
export default dashboardRoutes