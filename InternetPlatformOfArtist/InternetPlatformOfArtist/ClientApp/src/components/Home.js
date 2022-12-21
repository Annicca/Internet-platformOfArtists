import React, {useState, useEffect} from 'react';
import { GroupList } from './group/Group';
import { SearchForm } from './SearchForm/SearchForm';
import { handleValue } from './helpers/handleValue';
import { Link } from 'react-router-dom';

import './group/Group.scss';

export const Home = ()=>{

  const store = require('store');
  const userAuth = store.get('user');

  const [groups, setGroups] = useState([]);
  const [city, setCity] = useState('');

  const url = "https://localhost:44344/api/groups";
  const urlSearch = `https://localhost:44344/api/groups/city/${city}`;

  useEffect(() => {
    const urlData = handleValue(city, url, urlSearch);
    const dataFetch = async (urlData) => {
      const data = await (
        await fetch(urlData)).json();
      console.log(data);
      setGroups(data);
  };
  dataFetch(urlData);
    
  }, [city]);

  const classnames = {
    container: 'main-container',
    groupList: 'main-container-list',
    inputContainer: 'input-container',
    button: 'button-container_participant'
  }

  return (
      <>
        <div className={classnames.inputContainer}>
        { userAuth?.idRole != 4  ?
        <Link to='/statement' ><button className = {classnames.button}>+Разместить свой коллектив</button></Link>
        : <div></div>
        }
          <SearchForm searchText={'Введите город'} setValue = {setCity} />
        </div>
        <GroupList groups = {groups} classnames= {classnames} />
      </>
  )
}