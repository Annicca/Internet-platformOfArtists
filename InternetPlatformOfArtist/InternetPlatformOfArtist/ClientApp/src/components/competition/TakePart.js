import React from "react";
import classNames from "classnames";
import { Group } from "../group/Group";
import axios from "axios";
import { getPostConfig } from "../helpers/getRequestConfig";


export const TakePart = ({isActive, setIsActive, groups, idCompetition}) =>{

    const participant = async(idCompetition, idGroup) =>{
        await axios.post('https://localhost:44344/api/participants',
            {
                "idCompetition": idCompetition,
                "idGroup" : idGroup
            },
            getPostConfig()
        )
        .then(() =>{setIsActive(false)})
        .catch((error) => console.log(error))
    }

    const classnames = {
        takePart: 'take-part',
        active: 'take-part_active',
        container: 'take-part__container',
        title: 'take-part__title',
        closeX: 'take-part__close',
        participant: "take-part__participant"
    }
    return(
        <div className={ !isActive ? classnames.takePart : classNames(classnames.takePart, classnames.active)}>
            <div className={classnames.container}>
                <p className={classnames.title}><span>Выберете коллектив</span><span className={classnames.closeX} onClick={() => setIsActive(false)}>x</span></p>
                {groups.map((group)=>
                    <div key = {group.idGroup} onClick={()=>participant(idCompetition, group.idGroup)} className = {classnames.participant}><Group group={group} /></div>
                )}
            </div>
        </div>
    )
}