import React,{useEffect, useState} from 'react';
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

  const [user, setUser] = useState('');
  useEffect(() =>{
    const dataFetch = async () =>{
        const user = await(await fetch(`https://localhost:44344/api/users/user`,{
          headers:{'Content-Type': 'application/json'},
          credentials: `include`})
        ).json();

        setUser(user);
      }
      dataFetch();
  }, [user]);

    return (
      <Layout>
        <Routes>
          <Route path  ='/' element={<Home user = {user} />} />
          <Route path='/users/:id' element={<User/>} />
          <Route path='/users' element={<Users/>} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/registration' element = {<Registration />} />
        </Routes>        
      </Layout>
    );
}
