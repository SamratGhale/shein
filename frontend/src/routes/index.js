//Routes and paths 
//Routes are the classes that contains information of the routes
//Paths are just paths to the route
import Home from '../modules/home';
// import HomeRoutes from './HomeRoutes';
import { Switch, Route } from 'react-router-dom';
import DefaultAuth from '../global/DefaultProtect';
import React, { Fragment, useEffect, Suspense, lazy } from 'react';
import AppRoutes from './Routes';
//import DefaultAuth from 'src/global/Auth/DefaultProtect';
// ----------------------------------------------------------------------


function RouteProgress(props) {
  return <Route {...props} />;
}

export const renderRoutes = (routes = []) => {
  return (
    <Suspense fallback={<Home />} >

      <Switch>
        {routes.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard || DefaultAuth;
          const Layout = route.layout || Fragment;
          //const BreadCrumbs = route.breadcrumbs || [];
          //const Heading = route.heading || '';
          const authorizedUsers = route.roles || [];

          return (
            <RouteProgress
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard authorizedUsers={authorizedUsers}>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component
                        {...props}
                      />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('../views/page404'))
  },
  AppRoutes,
];
export default routes;