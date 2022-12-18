import React, {useState, useEffect} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { MyGroupList } from "./MyGroupList";
import { Link, useNavigate } from "react-router-dom";

export const MyGroup = () =>{

    const store = require('store');
    const user = store.get('user');

    const [groups, setGroups] = useState([]);
    let navigate = useNavigate();
    let url = `https://localhost:44344/api/groups/mygroups/${user?.idUser}`;

    useEffect(() => {
        if(!user){
            navigate('/notfound');
        }
        const dataFetch = async (url) => {
          const data = await (
            await fetch(url)).json();
          console.log(data);
          setGroups(data);
        };
        dataFetch(url);
      }, [setGroups]);

    const classnames = {
        container: 'main-container',
        request: 'request'

    }
    return(
        <div className={classnames.container}>
            <TitlePage title={'Мои коллективы'} />
            {groups.length == 0 ? 
            <h3 className={classnames.request}>У вас ещё нет коллективов</h3> :
            <MyGroupList groups = {groups} setState = {setGroups} />
            }
        </div>
    )
}