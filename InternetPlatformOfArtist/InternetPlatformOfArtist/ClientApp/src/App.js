import React from 'react';
import { Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import { Login } from './components/authorize/Login';
import { Registration } from './components/authorize/Registration';
import { Home } from './components/Home';
import { Users} from './components/users/Users';
import {User} from './components/users/User';
import { Competitions } from './components/Competitions';

import './index.scss';
import { NotFound } from './components/notfound/notfound';


export default function App() {
    
    return (
        <Routes>
            <Route path  = '/' element = {<Layout />}>
              <Route  index element={<Home />} />
              <Route path='competitions' element={<Competitions/>} />
              <Route path='users/:id' element={<User/>} />
              <Route path='users' element={<Users/>} />
            </Route>
            <Route exact path = '/login' element = {<Login />} />
            <Route exact path = '/signin' element = {<Registration />} />
            <Route path = "*" element = {<NotFound />} />
        </Routes> 
    );
}
