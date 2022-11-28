import React from "react";
import { Image } from "../img/Image";

import './Competition.scss';

export const Competition = ({competition}) =>{

    const classnames = {
        competition: 'competition',
        imgContainer: 'competition-container',
        img : 'competition-container-img',
        info: 'competition-info',
        name: 'competition-info-title',
        city: 'competition-info-title-city',
        date: 'competition-info-date',
        dateText: 'competition-info-date-text',


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
                <div className = {classnames.date}>
                        <Image src = './icons/calendar.svg' alt = 'Адрес: '  />
                        <div className = {classnames.dateText}>{competition.start + "-" + competition.finish}</div>
                </div>
            </div>
        </div>
    )
}