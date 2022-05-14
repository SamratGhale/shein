/*
import {PATH_APP, PATH_PAGE, ROOTS} from "./paths";
import DashBoardLayout from "../layout";
import React from "react";
import Home from '../modules/home'
import ComponentWrapper from '../global/ComponentWrapper';
import { Redirect } from "react-router-dom";
import AuthProtect from "../global/AuthProtect";
import Login from "../modules/users/login";

const Routes = {
    path: '*',
    layout: DashBoardLayout,
    routes:[
        {
            exact: true,
            path:ROOTS.app, 
            //roles:[ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN],
            guard: AuthProtect,
            heading: 'Home',
            component : (props)=>(
                <ComponentWrapper {...props}>
                    <Home/>
                </ComponentWrapper>
            )
        },
        {
            exact: true,
            path:PATH_PAGE.auth.login, 
            //roles:[ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN],
            guard: AuthProtect,
            heading: 'Login',
            component : (props)=>(
                <ComponentWrapper {...props}>
                    <Login/>
                </ComponentWrapper>
            )
        },
        {
            component: () => <Redirect to="/404" />
        }
    ]
}
export default Routes;
*/