import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
//
import Blog from '../pages/Blog';
import User from '../modules/users';
import Login from '../pages/Login';
import NotFound from '../pages/Page404';
import Register from '../pages/Register';
import Products from '../pages/Products';
import DashboardApp from '../pages/DashboardApp';
import { PATH_APP } from './paths';

// ----------------------------------------------------------------------

export default function Router({ isLoggedIn }) {
  return useRoutes([
    {
      path: '/',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to='/login' />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: '', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: PATH_APP.root,
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
