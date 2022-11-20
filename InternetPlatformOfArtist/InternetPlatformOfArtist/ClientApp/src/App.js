import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Users} from './components/users/Users';
import {User} from './components/users/User';
import { Login } from './components/logIn/Login';
import { Registration } from './components/registration/Registration';

import './index.scss';



export default function App() {

    return (
      <Layout>
        <Routes>
          <Route path  ='/' element={<Home/>} />
          <Route path='/users/:id' element={<User/>} />
          <Route path='/users' element={<Users/>} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/registration' element = {<Registration />} />
        </Routes>        
      </Layout>
    );
}
