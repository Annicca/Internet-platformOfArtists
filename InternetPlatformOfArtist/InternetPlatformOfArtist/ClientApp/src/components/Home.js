import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Group } from './group/Group';
import { SearchForm } from './SearchForm/SearchForm';

import './group/Group.scss';


export const Home = ()=>{

  const [groups, setGroups] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://localhost:44344/api/groups"
        )
      ).json();
      console.log(data);
      setGroups(data);
    };

    dataFetch();
  }, [setGroups]);

  // let navigate = useNavigate();
  // const detail = (id) =>{ 
  //   let path = `/groups/${id}`; 
  //   navigate(path);
  // }

  const classnames = {
    container: 'main-container',
    groupList: 'main-container-list',
    inputContainer: 'input-container',
    button: 'input-container_button'
  }

  return (
      <div className={classnames.container}>
        <div className={classnames.inputContainer}>
          <button className = {classnames.button}>+Разместить свой коллектив</button>
          <SearchForm searchText={'Введите город'} />
        </div>
        
        <div className = {classnames.groupList}>
          {groups == undefined ? <div>Loading...</div> : groups.map((group) =>
              <Link to = {`/${group.idGroup}`}> <Group group = {group} key = {group.idGroup} /></Link>
          )
          } 
        </div>
      </div>
  )
}