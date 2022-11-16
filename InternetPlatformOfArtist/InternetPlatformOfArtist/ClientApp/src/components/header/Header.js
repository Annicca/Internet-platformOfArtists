import React from 'react';
import {header} from '../../Constant';
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
                    Лого
                </div>
                <List data = {header} classnames = {classnameList}/>
            </div>
        </header>
    )
}