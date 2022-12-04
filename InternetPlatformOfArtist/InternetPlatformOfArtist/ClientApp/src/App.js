import React from 'react';
import { Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import { Login } from './components/authorize/Login';
import { Registration } from './components/authorize/Registration';
import { Home } from './components/Home';
import { Users} from './components/users/Users';
import {User} from './components/users/User';
import { Competitions } from './components/Competitions';
import { NotFound } from './components/notfound/notfound';
import { CompetitionPage } from './components/competitionPage/CompetitionPage';
import { GroupPage } from './components/groupPage/GroupPage';
import { MyGroup } from './components/myGroupsPage/MyGroup';
import { GroupChange } from './components/groupChange/GroupChange';

import './index.scss';





export default function App() {
    
    return (
        <Routes>
            <Route path  = '/' element = {<Layout />}>
              <Route index element={<Home />} />
                <Route path=':id' element = {<GroupPage />} />
              <Route path= 'competitions/:id' element = {<CompetitionPage />} />
              <Route path='competitions' element={<Competitions/>} />
              <Route path='users/:id' element={<User/>} />
              <Route path='users' element={<Users/>} />
              <Route path = 'mygroups' element = {<MyGroup/>} />
              <Route path = 'mygroups/change/:id' element = {<GroupChange/>} />
            </Route>
            <Route exact path = '/login' element = {<Login />} />
            <Route exact path = '/signin' element = {<Registration />} />
            <Route path = "*" element = {<NotFound />} />
        </Routes> 
    );
}
