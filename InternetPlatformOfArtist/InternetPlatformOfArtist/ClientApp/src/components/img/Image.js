import classNames from 'classnames';
import React from 'react';

export const Image = ({src,alt,className})=>{
    const classes = classNames(
        className
    );
    return(
        <img
            src = {src}
            alt = {alt}
            className = {classes}
        />
    )
}