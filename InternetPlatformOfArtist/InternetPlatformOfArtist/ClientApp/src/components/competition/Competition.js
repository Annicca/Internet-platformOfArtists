import React from "react";
import { Image } from "../img/Image";
import { Contact } from "../contact/Contact";
import { Link } from "react-router-dom";

import './Competition.scss';

const Competition = ({competition, classnames}) =>{

    return(
        <div className = {classnames.competition}>
            <div className={classnames.imgContainer}>
                <Image src= {competition.img} alt = ' Нет фото' width = {230} height = {162} className = {classnames.img} />
            </div>
            <div className={classnames.info}>
                <div className={classnames.name}>
                    <p>{competition.nameCompetition}</p>
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