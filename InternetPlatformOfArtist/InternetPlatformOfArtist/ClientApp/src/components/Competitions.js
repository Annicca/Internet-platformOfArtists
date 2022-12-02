import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Competition, CompetitionList } from './competition/Competition';
import { handleValue } from './helpers/handleValue';
import { SearchForm } from './SearchForm/SearchForm';

export const Competitions = ()=>{

  const [competitions, setCompetitions] = useState();
  const [city, setCity] = useState('');

  const url = "https://localhost:44344/api/competitions";
  const urlSearch = `https://localhost:44344/api/competitions/city/${city}`;

  useEffect(() => {
    let urlData = handleValue(city, url, urlSearch);
    const dataFetch = async (urlData) => {
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
    button: 'input-container_button'
  }

  return (
      <div className={classnames.container}>
          <div className={classnames.inputContainer}>
          <button className = {classnames.button}>+Разместить свой конкурс</button>
          <SearchForm searchText={'Введите город'} setValue = {setCity} />
        </div>
        <CompetitionList competitions = {competitions}  classnames = {classnames} />
      </div>
  )
}