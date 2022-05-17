import React from 'react';
import Router from './routes';
import SnackbarProvider from 'react-simple-snackbar';
import { BrowserRouter } from 'react-router-dom';
import { ItemsContextProvider } from './modules/home/context';
import { GoogleOAuthProvider } from '@react-oauth/google';

const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID

const App = () => {
  return (
    <SnackbarProvider>
      <GoogleOAuthProvider clientId={client_id}>
        <ItemsContextProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ItemsContextProvider>
      </GoogleOAuthProvider>
    </SnackbarProvider>
  )
}
export default App;