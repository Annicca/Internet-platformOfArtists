import React from "react";
import classNames from "classnames";

export const UserIcon = ({className}) => {
    const classes = classNames(
        className
    )
    return(
        <svg 
        width="58" 
        height="58" 
        className ={classes}
        viewBox="0 0 50 58" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_74_996)">
<circle cx="29" cy="25" r="24" fill="white" stroke="#4F4F4F" stroke-width="2"/>
<path d="M13.4445 42.7778C21.0775 30.9197 35.6959 30.6749 44.5556 42.7778" stroke="#4F4F4F" stroke-width="3" stroke-linecap="round"/>
<circle cx="29" cy="18.3333" r="10.1111" fill="#FFD700" stroke="#4F4F4F" stroke-width="2"/>
<path d="M43.5271 42.9054C40.4865 45.6081 34.4055 47.973 29 47.973C22.9096 47.973 17.1757 45.2703 14.473 42.9054C16.5 39.8649 21.2298 34.7973 28.3244 34.7973C35.419 34.4595 41.1622 39.8649 43.5271 42.9054Z" fill="#FFD700"/>
</g>
<defs>
<filter id="filter0_d_74_996" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_74_996"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_74_996" result="shape"/>
</filter>
</defs>
</svg>
    )
}