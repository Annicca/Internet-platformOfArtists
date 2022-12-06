import React, {useState, useEffect} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { Link } from "react-router-dom";
import { MyCompetitionList } from "./MyCompetitionList";


export const MyCompetition = () =>{

    const store = require('store');
    const user = store.get('user');
    const id = user.idUser;

    const [competitions, setCompetitions] = useState([]);
    let url = `https://localhost:44344/api/competitions/mycompetitions/${id}`;
    


    useEffect(() => {
        const dataFetch = async (url) => {
            const data = await (
            await fetch(url)).json();
            console.log(data.results);
            setCompetitions(data.results);
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
                    Чтобы посмотреть свои конкурсы необходимо <Link  to = '/login'>авторизоваться</Link> 
                </h3>
            </div>
        )
    } else if(competitions == []){
        <div className={classnames.container}>
            <h3 className={classnames.request}>У вас ещё нет конкурсов</h3>
        </div>
    } else{
        return(
            <div className={classnames.container}>
                <TitlePage title={'Мои конкурсы'} />
                <MyCompetitionList competitions={competitions} setCompetitions = {setCompetitions} />
            </div>
        )
    }
}