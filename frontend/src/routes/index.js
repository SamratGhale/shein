import Home from '../modules/home';
import DashboardLayout from "../layout";
import { useRoutes } from 'react-router-dom';
import React from 'react';
import Cart from '../modules/home/cart';
import Login from '../modules/users/login';
import { PATH_APP, PATH_PAGE } from './paths';
import Account from '../modules/users/account';
import ItemDetail from '../modules/home/details';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: PATH_APP.root, element: <Home /> },
        { path: PATH_APP.app.account, element: <Account /> },
        { path: PATH_APP.app.cart, element: <Cart /> },
        { path: PATH_APP.app.item_detail, element: <ItemDetail /> },
        { path: PATH_PAGE.auth.login, element: <Login /> },
      ],
    },
  ]);
}