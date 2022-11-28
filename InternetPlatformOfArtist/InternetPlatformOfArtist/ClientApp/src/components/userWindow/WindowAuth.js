import React from "react";
import { roles } from "../../Constant";

import { List } from "../list/List";

export const WindowAuth = ({user, list}) =>{
    const classList = {
        titleWindow: 'user-container-title',
        ul: 'userlist',
        li: 'userlist-item',
        link: 'userlist-item-link'
    }

    let role = roles.map((role, index) => {if(role.idRole === user.idRole){
        return(<span key = {index}>{role.name}</span>) ;
    }});

    return(
        <>
            <div className = {classList.titleWindow}>
                <p>
                    {user.surnameUser + ' ' + user.nameUser + ' ' + user.patronimycUser}
                </p>
                <p>{role}</p>
            </div>
            <List data = {list} classnames = {classList} />
        </>
    )
}