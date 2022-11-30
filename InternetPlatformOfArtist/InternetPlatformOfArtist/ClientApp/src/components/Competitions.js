import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Competition } from './competition/Competition';
import { SearchForm } from './SearchForm/SearchForm';

export const Competitions = ()=>{

  const [competitions, setCompetitions] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://localhost:44344/api/competitions"
        )
      ).json();
      console.log(data);
      setCompetitions(data);
    };

    dataFetch();
  }, [setCompetitions]);

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
          <SearchForm searchText={'Введите город'} />
        </div>
        <div className = {classnames.list}>
          {competitions == undefined ? <div>Loading...</div> : competitions.map((competition) =>
              <Link to = "/compettions:id"><Competition competition = {competition} key = {competition.idCompetition} /></Link>
          )
          } 
        </div>
      </div>
  )
}