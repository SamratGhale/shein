import Home from '../modules/home';
import DashboardLayout from "../layout";
import { useRoutes } from 'react-router-dom';
import React from 'react';
import Cart from '../modules/home/cart';
import Login from '../modules/users/login';
import { PATH_APP, PATH_PAGE } from './paths';
import Account from '../modules/users/account';
import ItemDetail from '../modules/home/details';
import SignUp from '../modules/users/signup';
import Verify from '../modules/users/verify';
import ContactUs from '../modules/ContactUs';
import Orders from '../modules/Orders';
import AuthProtect from '../global/AuthProtect';
import Checkout from '../modules/Orders/checkout';
import CheckoutCart from '../modules/checkout/CheckoutCart';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: PATH_APP.root, element: <Home /> },
        { path: PATH_APP.app.contactus, element: <ContactUs /> },
        { path: PATH_APP.app.item_detail, element: <ItemDetail /> },
        { path: PATH_PAGE.auth.login, element: <Login /> },
        { path: PATH_PAGE.auth.signup, element: <SignUp /> },
        { path: PATH_PAGE.auth.verify, element: <Verify /> },
      ],
    },
    {
      path: '/',
      element:( 
        <AuthProtect>
          <DashboardLayout />
        </AuthProtect>
      ),
      children: [
        { path: PATH_APP.app.account, element: <Account /> },
        { path: PATH_APP.app.cart, element: <Cart /> },
        { path: PATH_APP.app.orders, element: <Orders /> },
        { path: PATH_APP.app.checkout, element: <CheckoutCart/> },
      ],
    }
  ]);
}