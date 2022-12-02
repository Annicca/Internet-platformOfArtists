import React from "react";
import { TitlePage } from "../TitlePage/TitlPage";

import { TableUser } from "../TableAdmin/TableUser";

import './Users.scss';


export const Users = () =>{

    return(
          <div className="main-container">
            <TitlePage title = 'Пользователи' />
            <TableUser />
          </div>
    )}
