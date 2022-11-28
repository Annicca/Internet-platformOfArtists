import React, {useState, useEffect} from 'react';
import { Group } from './group/Group';

import './group/Group.scss';

export const Home = ()=>{

  // const store =  require('store');
  // const user = store.get('user');

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

  const classnames = {
    container: 'main-container',
    groupList: 'main-container-list'
  }

  return (
      <div className={classnames.container}>
        <div className = {classnames.groupList}>
          {groups == undefined ? <div>Loading...</div> : groups.map((group) =>
              <Group group = {group} key = {group.idGroup} />
          )
          } 
        </div>
      </div>
  )
}