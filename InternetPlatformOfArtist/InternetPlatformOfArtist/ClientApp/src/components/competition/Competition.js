import React, {useState, useEffect} from "react";
import { Image } from "../img/Image";
import { Contact } from "../contact/Contact";
import { Link } from "react-router-dom";
import { TakePart } from "./TakePart";
import { fetchMyGroups } from "../helpers/fetchMyGroups";

import './Competition.scss';


const Competition = ({competition, classnames, setIsActivePart, setIdComp}) =>{

    let isDisabled = false;
    if(competition.status.idStatusCompetition == 3 || competition.status.idStatusCompetition == 4){
        isDisabled = true;
    }

    return(
        <div className = {classnames.competition}>
            <div className={classnames.imgContainer}>
                <Image src= {competition.img} alt = ' Нет фото' width = {220} height = {142} className = {classnames.img} />
                { competition.status.idStatusCompetition != 1 ?
                    <p className = {classnames.status}>{'Статус: ' + competition.status.nameStatus}</p> :
                    <p className = {classnames.status}>Статус: Набор участников</p>
                }
                
            </div>
            <div className={classnames.info}>
                <div className={classnames.title}>
                    <p className={classnames.name}>{competition.nameCompetition}</p>
                    <p className = {classnames.city}>{'Город: ' + competition.cityCompetition}</p>
                    
                </div>
                <Contact contact = {competition.start + "-" + competition.finish} src = './icons/calendar.svg' alt = 'Адрес: ' width = {20} height = {21}  classnames = {classnames} />
                <div className= {classnames.buttonContainer}>
                    
                    <button className={classnames.button} disabled={isDisabled} onClick={(e) =>{e.preventDefault(); setIsActivePart(true); setIdComp(competition.idCompetition)}}>Принять участие</button>
                </div>
            </div>
            
        </div>
    )
}

export const CompetitionList = ({competitions, classnames}) =>{
    const store = require('store');
    const user = store.get('user');
    const id = user?.idUser;

    const [isActivePart, setIsActivePart] = useState(false);
    const [idComp, setIdComp] = useState();
    const [groups, setGroups] = useState([]);
    
    let url = `https://localhost:44344/api/users/mygroups/${id}`;

    useEffect(() => {
        fetchMyGroups(url, setGroups);
      }, [url]);

    return(
        <div className = {classnames.list}>
        {competitions == undefined ? <div>Loading...</div> : competitions.map((competition) =>
            <Link to = { `/competitions/${competition.idCompetition}`} key = {competition.idCompetition} ><Competition competition = {competition} classnames = {classnames} groups = {groups} setIsActivePart = {setIsActivePart} setIdComp={setIdComp}/></Link>
        )
        } 
        <TakePart isActive={isActivePart}  setIsActive={setIsActivePart} groups={groups} idCompetition={idComp} />
      </div>
    )
}