import React from 'react';
import { Link } from 'react-router-dom';
import {header} from '../../Constant';
import { Logo } from '../../icon/Logo';
import { List } from '../list/List';

import './Header.scss';


export const Header = () => {
    const classnameList = {
        conteiner: 'header',
        ul: 'header-list',
        li: 'header-list-item',
        link: 'header-list-item-link'
    }
    return (
        <header>
            <div className = {classnameList.conteiner}>
                <div>
                   <Link to={`/`}><Logo /></Link>
                </div>
                <List data = {header} classnames = {classnameList}/>
            </div>
        </header>
    )
}