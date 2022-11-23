import React, {useState, useEffect} from "react";
import { List } from './../list/List';
import { navMenuButton } from '../../Constant';
import {UserIcon} from '../../icon/UserIcon';
import {ShoppingCartIcon} from '../../icon/ShoppingCartIcon';
import {CompetitionIcon} from '../../icon/CompetitionIcon';
import { UserWindow } from '../userWindow/UserWindow';

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

    const [active, setActive] = useState(false);

    return(
        <nav>
            <div className = {classnames.container}>
                <List data = {navMenuButton} classnames = {classnames} />
                <div className = {classnames.icons}>
                    <ShoppingCartIcon className = {classnames.icon} />
                    <CompetitionIcon className = {classnames.icon} />
                    <div onMouseEnter={() => setActive(true)}>
                        <UserIcon className = {classnames.icon} />
                        <UserWindow active = {active} setActive = {setActive}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}