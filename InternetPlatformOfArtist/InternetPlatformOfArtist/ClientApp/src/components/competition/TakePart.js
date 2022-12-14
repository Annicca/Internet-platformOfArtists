import React, {useState} from "react";
import classNames from "classnames";
import { Group } from "../group/Group";
import axios from "axios";

export const TakePart = ({isActive, setIsActive, groups, idCompetition}) =>{

    const participant = async(idCompetition, idGroup) =>{
        await axios({
            method: 'POST',
            url: 'https://localhost:44344/api/participants',
            headers: {'Content-Type': 'application/json'},
            data: {
                "idCompetition": idCompetition,
                "idGroup" : idGroup
            }
        })
        .then(() =>{setIsActive(false)})
        .catch((error) => console.log(error))
    }

    const classnames = {
        takePart: 'take-part',
        active: 'take-part_active',
        container: 'take-part__container',
        title: 'take-part__title',
        closeX: 'take-part__close'
    }
    return(
        <div className={ !isActive ? classnames.takePart : classNames(classnames.takePart, classnames.active)}>
            <div className={classnames.container}>
                <p className={classnames.title}><span>Выберете коллектив</span><span className={classnames.closeX} onClick={() => setIsActive(false)}>x</span></p>
                {groups.map((group)=>
                    <div key = {group.idGroup} onClick={()=>participant(idCompetition, group.idGroup)}><Group group={group} /></div>
                )}
            </div>
        </div>
    )
}