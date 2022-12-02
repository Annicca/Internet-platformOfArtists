import React from "react";
import classNames from "classnames";

export const Button = ({text, type, classnames, valid}) =>{
    const classes = classNames(
        classnames
    );
    return(
        <button type= {type} disabled = {valid} className = {classes} >{text}</button>
    )
}