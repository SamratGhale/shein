import React from 'react';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { ItemsContextProvider } from './modules/home/context';
import { GoogleOAuthProvider } from '@react-oauth/google';

const history = createBrowserHistory();
const App = () => {
  return (
    <GoogleOAuthProvider clientId='431768201298-mgaovmvtdsofaiq2k4k7frf18knosqmf.apps.googleusercontent.com'>

    <ItemsContextProvider>
      <BrowserRouter>
      <Router/>
      </BrowserRouter>
    </ItemsContextProvider>
    </GoogleOAuthProvider>
  )
}
export default App;