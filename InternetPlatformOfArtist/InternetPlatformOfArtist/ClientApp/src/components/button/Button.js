import React from "react";
import { ProgressPlugin } from "webpack";

import './Button.scss';

export const Button = ({text, type, classes}) =>{
    return(
        <button type= {type} className = {classes ? 'button' + classes : 'button'} >{props.children}</button>
    )
}