import React,{useEffect, useState} from 'react';
import { Route, Routes} from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Users} from './components/users/Users';
import {User} from './components/users/User';


import './index.scss';

export default function App() {

  const [user, setUser] = useState(null);
  useEffect(() =>{
    const dataFetch = async () =>{
        const user = await(await fetch(`https://localhost:44344/api/users/user`,{
          headers:{'Content-Type': 'application/json'},
          credentials: `include`})
        ).json()
        .then(() => (setUser(user)))
        .catch((error) => console.log(error));
      };
      dataFetch();
  }, []);

    return (
      <Layout>
        <Routes>
          <Route path  = '/' element={<Home user = {user} />} />
          <Route path='users/:id' element={<User/>} />
          <Route path='users' element={<Users/>} />
        </Routes>        
      </Layout>
    );
}
