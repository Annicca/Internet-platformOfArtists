import React, {useState, useEffect} from 'react';
import { Competition } from './competition/Competition';

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
    list: 'main-container-list'
  }

  return (
      <div className={classnames.container}>
        <div className = {classnames.list}>
          {competitions == undefined ? <div>Loading...</div> : competitions.map((competition) =>
              <Competition competition = {competition} key = {competition.idCompetition} />
          )
          } 
        </div>
      </div>
  )
}