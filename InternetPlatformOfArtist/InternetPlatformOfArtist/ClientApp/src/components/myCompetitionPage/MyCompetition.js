import React, {useState, useEffect} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { MyCompetitionList } from "./MyCompetitionList";
import { useNavigate } from "react-router-dom";
import { getRequestConfig } from "../helpers/getRequestConfig";
import axios from "axios";

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
        const getCompetition = async (url) => {
            const response = await axios(url, getRequestConfig());
            console.log(response.data);
            setCompetitions(response.data);
    };
        getCompetition(url);
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