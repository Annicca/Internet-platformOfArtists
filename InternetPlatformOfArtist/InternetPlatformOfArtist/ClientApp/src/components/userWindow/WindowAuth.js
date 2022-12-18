import React from "react";
import { defineRole } from "../helpers/defineRole";

import { List } from "../list/List";

export const WindowAuth = ({user, list}) =>{
    const classList = {
        titleWindow: 'user-container-title',
        ul: 'userlist',
        li: 'userlist-item',
        link: 'userlist-item-link'
    }
    const role = defineRole(user.idRole);

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