import React from 'react';
import { Router } from 'react-router-dom'
import routes, { renderRoutes } from './routes';
import {createBrowserHistory} from 'history';
import { ItemsContextProvider } from './modules/home/context';

const history = createBrowserHistory();
const App = () => {
  return (
    <ItemsContextProvider>
    <Router history={history}>
      {renderRoutes(routes)};
    </Router>
    </ItemsContextProvider>
  )
}
export default App;