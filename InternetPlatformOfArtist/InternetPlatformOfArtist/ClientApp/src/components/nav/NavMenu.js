import React, {useState} from "react";
import { List } from './../list/List';
import { navMenuButton } from '../../Constant';
import {UserIcon} from '../../icon/UserIcon';
import {ShoppingCartIcon} from '../../icon/ShoppingCartIcon';
import {CompetitionIcon} from '../../icon/CompetitionIcon';
import { UserWindow } from '../userWindow/UserWindow';
import {Image} from '../img/Image';

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

    const [active, setActive] = useState(false);

    return(
        <nav>
            <div className = {classnames.container}>
                <List data = {navMenuButton} classnames = {classnames} />
                <div className = {classnames.icons}>
                    {/* <ShoppingCartIcon className = {classnames.icon} /> */}
                    <Image src = {'/icons/competion.svg'} alt = "Мои конкурсы" className = {classnames.icon} />
                    {/* <CompetitionIcon className = {classnames.icon} /> */}
                    <div onMouseEnter={() => setActive(true)} className = {classnames.icon}>
                        <UserIcon  />
                        <UserWindow user = {user} active = {active} setActive = {setActive}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}