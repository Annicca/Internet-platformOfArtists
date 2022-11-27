import React from "react";
import { Link } from "react-router-dom";

import './UserWindow.scss';

export const UserWindow = ({user, active, setActive}) =>{
    const classnames = {
        container: 'user-container',
        containerActive: 'user-container active',
        buttonlog: 'user-container-button'
    }
    if(!user){
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
            <div className ={active ? classnames.containerActive : classnames.container} onMouseLeave={() => setActive(false)}>
                <div>
                    <p>{user.surName + ' ' + user.name + ' ' + user.patronimyc}</p>
                    <p>{user.loginUser}</p>
                </div>
                <ul>
                    
                </ul>
            </div>
        )
    }
}