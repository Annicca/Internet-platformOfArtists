import React, {useState} from "react";
import {UserIcon} from '../../icon/UserIcon';
import { UserWindow } from '../userWindow/UserWindow';
import {Image} from '../img/Image';

import './NavMenu.scss';
import { NavLink } from "react-router-dom";

export const NavMenu = ({user}) =>{
    const classnames = {
        container: 'nav-container',
        icons: 'nav-container-icon',
        icon: 'nav-container-icon-items',
        ul: 'nav-container-list',
        li: 'nav-container-list-items',
        link: 'nav-container-list-items-link'
    }

    const [activeWindow, setActiveWindow] = useState(false);
    const logout = () =>{
        const store = require('store');
        store.remove('user');
    }
    return(
        <nav>
            <div className = {classnames.container}>
                {/* //<NavList data = {navMenuButton} classnames = {classnames} /> */}
                <div className = {classnames.ul}>
                    <NavLink to = "/" end className = {({ isActive }) =>
                        classnames.li + (!isActive ? "" : " select")}  >
                            Коллективы
                    </NavLink>
                    <NavLink to = "competitions" className = {({ isActive })=>
                        classnames.li + (!isActive ? "" : " select")} >
                            Конкурсы
                    </NavLink>
                </div>
                <div className = {classnames.icons}>
                    <Image src = './icons/logout.svg' alt='Выход' onClick ={() => logout()} />
                    <div onMouseEnter={() => setActiveWindow(true)} className = {classnames.icon}>
                        <UserIcon  />
                        <UserWindow user = {user} activeWindow = {activeWindow} setActiveWindow = {setActiveWindow}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}