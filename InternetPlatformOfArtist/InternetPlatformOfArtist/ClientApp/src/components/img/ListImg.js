import React from "react";
import {Link} from "react-router-dom";
import { Image } from "./Image";
import classNames from 'classnames';

export const ListImg = ({imagesList, classnames}) =>{
    const classes = classNames(
        classnames
    );
    return(
        <div className = {classNames}>
            {imagesList.map((img,index) =>(
                <Link to = {img.link}>
                    <Image key = {index}
                        src = {img.src}
                        alt={img.alt}
                        className = {classes} /> 
                </Link> 
            ))}
        </div>
    )    
}       