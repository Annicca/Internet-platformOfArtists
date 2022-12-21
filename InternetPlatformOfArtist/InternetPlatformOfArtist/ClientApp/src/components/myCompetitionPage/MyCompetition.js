import React, {useState, useEffect} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { MyCompetitionList } from "./MyCompetitionList";
import { useNavigate } from "react-router-dom";

export const MyCompetition = () =>{

    const store = require('store');
    const user = store.get('user');
    const id = user.idUser;

    let navigate = useNavigate();

    const [competitions, setCompetitions] = useState([]);
    let url = `https://localhost:44344/api/competitions/mycompetitions/${id}`;
    
    useEffect(() => {
        if(!user || user.idRole == 3){
            navigate('/notfound');
        }
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

    return(
            <div className={classnames.container}>
                <TitlePage title={'Мои конкурсы'} />
                { competitions.length == 0 ?
                <h3 className={classnames.request}>У вас ещё нет конкурсов</h3> :
                <MyCompetitionList competitions={competitions} setCompetitions = {setCompetitions} />
                }
            </div>
    )
}