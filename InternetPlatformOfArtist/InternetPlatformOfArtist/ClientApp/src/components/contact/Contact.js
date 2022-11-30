import React from "react";
import { Image } from "../img/Image";

export const Contact = ({contact, src, alt, width, height, classnames}) =>{
    return(
        <div className={classnames.contact}>
            <Image src = {src} alt = {alt} className = {classnames.contactImg}  width=  {width} height ={height} />
            <span>{contact}</span>
        </div>
    )
}