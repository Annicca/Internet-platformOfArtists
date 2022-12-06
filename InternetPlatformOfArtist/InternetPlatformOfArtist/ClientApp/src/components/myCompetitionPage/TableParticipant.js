import React from "react";
import { participantTitle } from "../../Constant";

export const TableParticipant = ({participants}) => {
    return(
        <table className = {'table'}>
            <tr>
                {participantTitle.map((item,id)=>
                    <th key = {id}>
                        {item}
                    </th>
                )}
            </tr>

        </table>
    )
}