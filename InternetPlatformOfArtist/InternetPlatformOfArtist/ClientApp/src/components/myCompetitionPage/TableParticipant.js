import React from "react";
import { useNavigate } from "react-router-dom";
import { participantTitle } from "../../Constant";

export const TableParticipant = ({participants}) => {
    let navigate = useNavigate();

    return(
        <table className = {'table'}>
            <tbody>
                <tr>
                    {participantTitle.map((item,id)=>
                        <th key = {id}>
                            {item}
                        </th>
                    )}
                </tr>
                {participants.map((participant)=>
                <tr key = {participant.idGroup} onClick = {() => navigate(`/${participant.idGroup}`)}>
                    <td>{participant.nameGroup}</td>
                    <td>{participant.cityGroup + " " + participant.addressGroup}</td>
                    <td>{participant.director.surnameUser + " " + participant.director.nameUser + " " + participant.director.patronimycUser}</td>
                    {participant.director.phoneUser != null ? 
                        <td>{participant.director.phoneUser}</td> : <td>-</td>
                    }
                    <td>{participant.director.mailUser}</td>
                </tr>
            )}
            </tbody>
        </table>
    )
}