import React from "react";
import { Image } from "../img/Image";
import { Contact } from "../contact/Contact";

import './Competition.scss';

export const Competition = ({competition}) =>{

    const classnames = {
        competition: 'competition',
        imgContainer: 'competition-container',
        img : 'competition-container-img',
        info: 'competition-info',
        name: 'competition-info-title',
        city: 'competition-info-title-city',
        contact: 'contact',
        contactImg: 'contact-img',
        buttonContainer: 'button-container',
        button: 'button-container_participant'
    }

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