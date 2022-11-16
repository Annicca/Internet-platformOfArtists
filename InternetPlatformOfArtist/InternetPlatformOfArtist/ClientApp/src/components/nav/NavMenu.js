import React from 'react';
import { List } from './../list/List';
import { navMenuButton } from '../../Constant';
import {UserIcon} from '../../icon/UserIcon';
import {ShoppingCartIcon} from '../../icon/ShoppingCartIcon';
import {CompetitionIcon} from '../../icon/CompetitionIcon';

import './NavMenu.scss';

export const NavMenu = () =>{
    const classnames = {
        container: 'nav-container',
        icons: 'nav-container-icon',
        icon: 'nav-container-icon-items',
        ul: 'nav-container-list',
        li: 'nav-container-list-items',
        link: 'nav-container-list-items-link'
    }
    return(
        <nav>
            <div className = {classnames.container}>
                <List data = {navMenuButton} classnames = {classnames} />
                <div className = {classnames.icons}>
                    <ShoppingCartIcon className = {classnames.icon} />
                    <CompetitionIcon className = {classnames.icon} />
                    <UserIcon className = {classnames.icon} />
                </div>
            </div>
        </nav>
    )
}