import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import { UserProvider } from './providers/UserProvider';
import App from './App';

//import registerServiceWorker from './registerServiceWorker';

// const user =     {
//   idUser: 11,
//   surnameUser: "Саулова",
//   nameUser: "Анна",
//   patronimycUser: "Михайловна",
//   loginUser: "anutohka",
//   passwordUser: "slsaaas",
//   mailUser: "anna@mail.com",
//   phoneUser: "88005553535",
//   idRole: 4,
//   userRole: {
//       idRole: 4,
//       name: "organizerCompetition"
//   }
// }
// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href'); basename={baseUrl}
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

