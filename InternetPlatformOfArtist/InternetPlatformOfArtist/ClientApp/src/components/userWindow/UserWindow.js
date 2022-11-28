import React from "react";
import { Link } from "react-router-dom";
import { roles } from "../../Constant";

import './UserWindow.scss';

export const UserWindow = ({active, setActive}) =>{
    const store = require('store');

    const user = store.get('user');
//
    let role = roles.map((role) => {if(role.idRole === user.idRole){
        return(<span>{role.name}</span>) ;
    }});

    const classnames = {
        container: 'user-container',
        containerActive: 'user-container active',
        buttonlog: 'user-container-button',
        titleWindow: 'user-container-title',
        name: 'user-container-title-name',
        role: 'user-container-title-role',
        auth: 'user-container active auth'
    }
    if(user == undefined){
        return(
            <div className ={active ? classnames.containerActive : classnames.container} onMouseLeave={() => setActive(false)}>
                <Link to='/login'>
                    <button className={classnames.buttonlog}>
                        Вход
                    </button>
                </Link>
                <Link to='/signin'>  
                    <button className={classnames.buttonlog}>
                        Регистрация
                    </button>
                </Link>
            </div>
        )
    } else if(user.idRole == 2){
        return(
            <div className ={active ? classnames.auth : classnames.container} onMouseLeave={() => setActive(false)}>
                <div className = {classnames.titleWindow}>
                    <p className = {classnames.name}>
                        {user.surnameUser + ' ' + user.nameUser + ' ' + user.patronimycUser}
                    </p>
                    <p className = {classnames.role}>{role}</p>
                </div>
                <ul>
                    
                </ul>
            </div>
        )
    }
}