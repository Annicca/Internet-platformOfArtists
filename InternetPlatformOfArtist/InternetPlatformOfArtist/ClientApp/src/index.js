import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import { UserProvider } from './providers/UserProvider';
import App from './App';
import { Layout } from './components/Layout';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter >
    <CookiesProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CookiesProvider>
  </BrowserRouter>,
  rootElement);

