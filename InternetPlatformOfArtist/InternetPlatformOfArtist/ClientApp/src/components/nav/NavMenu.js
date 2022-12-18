import React, {useState} from "react";
import {UserIcon} from '../../icon/UserIcon';
import { UserWindow } from '../userWindow/UserWindow';
import {Image} from '../img/Image';
import { NavLink, useNavigate } from "react-router-dom";

import './NavMenu.scss';

export const NavMenu = ({user}) =>{

    const classnames = {
        container: 'nav-container',
        icons: 'nav-container-icon',
        icon: 'nav-container-icon-items',
        ul: 'nav-container-list',
        li: 'nav-container-list-items',
        link: 'nav-container-list-items-link'
    }

    let navigate = useNavigate();
    const [activeWindow, setActiveWindow] = useState(false);
    const logout = () =>{
        const store = require('store');
        store.remove('user');
        navigate('/');
    }
    return(
        <nav>
            <div className = {classnames.container}>
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
                    <div onClick ={() => logout()} className = {classnames.icon}>
                        <Image src = './icons/logout.svg' alt='Выход' />
                    </div>
                    <div onMouseEnter={() => setActiveWindow(true)} className = {classnames.icon}>
                        <UserIcon  />
                        <UserWindow user = {user} activeWindow = {activeWindow} setActiveWindow = {setActiveWindow}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}