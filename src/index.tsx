import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
);

reportWebVitals();
