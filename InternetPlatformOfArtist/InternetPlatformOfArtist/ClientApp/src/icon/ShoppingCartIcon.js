import React from "react";
import classNames from "classnames";

export const ShoppingCartIcon = ({className}) =>{
    const classes = classNames(
        className
    )
    return(
        <svg 
        width="47" 
        height="60" 
        className ={classes}
        viewBox="0 0 47 60" 
        fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_74_1001)">
<path d="M9.17958 16.2513C9.29877 15.2447 10.1521 14.4865 11.1657 14.4865H35.8343C36.8479 14.4865 37.7012 15.2447 37.8204 16.2513L41.6099 48.2513C41.7508 49.4408 40.8216 50.4865 39.6238 50.4865H23.5H7.37622C6.17843 50.4865 5.24924 49.4408 5.3901 48.2513L9.17958 16.2513Z" fill="white" stroke="#4F4F4F" stroke-width="2"/>
<path d="M14 26C14 -7.87114 33 -4.07254 33 26" stroke="#4F4F4F" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="14.5" cy="26" rx="2.5" ry="2" fill="#4F4F4F"/>
<ellipse cx="32.5" cy="26" rx="2.5" ry="2" fill="#4F4F4F"/>
</g>
<defs>
<filter id="filter0_d_74_1001" x="0.375854" y="0.498901" width="46.2483" height="58.9876" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_74_1001"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_74_1001" result="shape"/>
</filter>
</defs>
</svg>

    )
}