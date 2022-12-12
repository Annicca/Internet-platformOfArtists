import React from "react";
import { Image } from "../img/Image";
import { Contact } from "../contact/Contact";
import { Link } from "react-router-dom";

import './Competition.scss';

const Competition = ({competition, classnames}) =>{

    return(
        <div className = {classnames.competition}>
            <div className={classnames.imgContainer}>
                <Image src= {competition.img} alt = ' Нет фото' width = {220} height = {142} className = {classnames.img} />
                { competition.status.nameStatus!= null ?
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
                    <button className={classnames.button}>Принять участие</button>
                </div>
                
            </div>
        </div>
    )
}

export const CompetitionList = ({competitions, classnames}) =>{
    return(
        <div className = {classnames.list}>
        {competitions == undefined ? <div>Loading...</div> : competitions.map((competition) =>
            <Link to = { `/competitions/${competition.idCompetition}`} key = {competition.idCompetition} ><Competition competition = {competition} classnames = {classnames} /></Link>
        )
        } 
      </div>
    )
}