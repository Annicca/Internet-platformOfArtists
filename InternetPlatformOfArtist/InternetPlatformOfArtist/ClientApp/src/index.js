import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";
import { UserProvider } from './providers/UserProvider';
import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter >
      <UserProvider>
        <App />
      </UserProvider>
  </BrowserRouter>,
  rootElement);

