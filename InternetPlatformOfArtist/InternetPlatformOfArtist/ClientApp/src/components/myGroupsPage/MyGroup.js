import React, {useState, useEffect} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { MyGroupList } from "./MyGroupList";
import { Link } from "react-router-dom";

export const MyGroup = () =>{

    const store = require('store');
    const user = store.get('user');
    const id = user.idUser;
    //let id;

    const [groups, setGroups] = useState([]);
    let url = `https://localhost:44344/api/users/mygroups/${id}`;

    useEffect(() => {
        const dataFetch = async (url) => {
          const data = await (
            await fetch(url)).json();
            console.log(data.results);
          setGroups(data.results);
        };
        dataFetch(url);
      }, []);

    const classnames = {
        container: 'main-container',
        request: 'request'

    }

    if(id === undefined){
        return(
            <div className={classnames.container}>
                <h3 className={classnames.request}>
                    Чтобы посмотреть свои коллективы необходимо <Link  to = '/login'>авторизоваться</Link> 
                </h3>
            </div>
        )
    } else if(groups == []){
        <div className={classnames.container}>
            <h3 className={classnames.request}>У вас ещё нет коллективов</h3>
        </div>
    } else{
        return(
            <div className={classnames.container}>
                <TitlePage title={'Мои коллективы'} />
                <MyGroupList groups = {groups} setState = {setGroups} />
            </div>
        )
    }
}