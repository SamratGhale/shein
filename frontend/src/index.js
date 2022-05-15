import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeOptions } from '@mui/material';
import { CssBaseline } from '@mui/material';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#96cb76',
    },
    secondary: {
      main: '#352ac1',
    },
    text: {
      primary: '#fff',
    },
  },
  typography: {
    fontSize: 17,
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
  props: {
    MuiAppBar: {
      color: 'inherit',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
