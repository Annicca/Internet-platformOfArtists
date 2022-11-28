import classNames from 'classnames';
import React from 'react';

export const Image = ({src,alt,width, height, className})=>{
    const classes = classNames(
        className
    );
    return(
        <img
            src = {src}
            alt = {alt}
            width = {width}
            height = {height}
            className = {classes}
        />
    )
}