import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {CompetitionList } from './competition/Competition';
import { handleValue } from './helpers/handleValue';
import { SearchForm } from './SearchForm/SearchForm';

export const Competitions = ()=>{

  const [competitions, setCompetitions] = useState();
  const [city, setCity] = useState('');

  const store = require('store');
  const userAuth = store.get('user');

  const url = "https://localhost:44344/api/competitions";
  const urlSearch = `https://localhost:44344/api/competitions/city/${city}`;

  useEffect(() => {
    let urlData = handleValue(city, url, urlSearch);
    const dataFetch = async(urlData) => {
      const data = await (
        await fetch(urlData)).json();
      console.log(data);
      setCompetitions(data);
    };

    dataFetch(urlData);
  }, [city]);


  const classnames = {
    container: 'main-container',
    list: 'main-container-list',
    inputContainer: 'input-container',
    button: 'input-container_button',

    competition: 'competition',
    imgContainer: 'competition-container',
    img : 'competition-container-img',
    info: 'competition-info',
    title: 'competition-info-title',
    name: 'competition-info-title-name',
    city: 'competition-info-title-city',
    status: 'competition-container__status',
    contact: 'contact',
    contactImg: 'contact-img',
    buttonContainer: 'button-container',
    button: 'button-container_participant'
  }

  return (
      <>
        <div className={classnames.inputContainer}>
        { userAuth?.idRole != 3  ?
          <Link to='/statement' ><button className = {classnames.button}>+Разместить свой конкурс</button></Link>
          : <div></div>
        }
          <SearchForm searchText={'Введите город'} setValue = {setCity} />
        </div>
        <CompetitionList competitions = {competitions}  classnames = {classnames} />
      </>
  )
}