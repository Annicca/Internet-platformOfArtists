import React from "react";
import './TitlePage.scss';

export const TitlePage = ({title}) =>{
    return(
        <h1 className = {'title'}>{title}</h1>
    )
}