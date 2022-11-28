import React from "react";
import {Link} from "react-router-dom";
import { Image } from "./Image";
import classNames from 'classnames';

export const ListImg = ({imagesList, classnames}) =>{
    const classes = classNames(
        classnames
    );
    return(
        <div>
            {imagesList.map((img,index) =>(
                <Link to = {img.link} key = {index}>
                    <Image 
                        src = {img.src}
                        alt={img.alt}
                        className = {classes} /> 
                </Link> 
            ))}
        </div>
    )    
}       