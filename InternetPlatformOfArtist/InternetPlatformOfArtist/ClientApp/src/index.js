//import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import App from './App';
import { Login } from './components/logIn/Login';
import { Registration } from './components/registration/Registration';
import registerServiceWorker from './registerServiceWorker';


// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href'); basename={baseUrl}
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter >
    <Routes>
      <Route path = '/*' element = {<App />} />
      <Route exact path = '/login' element = {<Login />} />
      <Route exact path = '/signin' element = {<Registration />} />
    </Routes>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();
