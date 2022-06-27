import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


const darkTheme = createTheme({
  palette: {
    type: "light",
    // primary: {
    //   main: "#96cb76",
    // },
    // secondary: {
    //   main: "#352ac1",
    // },
    // text: {
    //   primary: "#fff",
    // },
  },
  typography: {
    fontSize: 17,
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: "#689f38",
        color: "#fff",
      },
    },
  },
  props: {
    MuiAppBar: {
      color: "inherit",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
serviceWorkerRegistration.register();
