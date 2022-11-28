import React from "react";
import { footerList, socials } from "../../Constant";
import {List} from '../list/List';
import { ListImg } from "../img/ListImg";

import './Footer.scss';

export const Footer = () =>{
    const classnames = {
        container: 'footer-container',
        ul: 'footer-container-list',
        li: 'footer-container-list-item',
        link: 'footer-container-list-item-link',
        social: 'footer-container-social',
        socialTitle: 'footer-container-social-title',
        socialImg: 'footer-container-social-img'
    }
    return(
        <footer>
            <div className={classnames.container}>
                <List data = {footerList} classnames = {classnames} />
                <div className = {classnames.social}>
                    <span className = {classnames.socialTitle}>Мы в соц сетях:</span>
                    <ListImg imagesList={socials} classnames = {classnames.socialImg} />
                </div>
            </div>
        </footer>
    )
}