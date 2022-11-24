import React from "react";
import classNames from "classnames";


import './Button.scss';

export const Button = ({text, type, classnames, valid}) =>{
    const classes = classNames(
        `${classnames} button `
    );
    return(
        <button type= {type} disabled = {valid} className = {classes} >{text}</button>
    )
}