import React from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { SearchForm } from "../SearchForm/SearchForm";
import { TableUser } from "../TableAdmin/TableUser";

import './Users.scss';


export const Users = () =>{

    return(
          <div className="main-container">
            <TitlePage title = 'Пользователи' />
            <SearchForm searchText = {'Введите логин'} />
            <TableUser />
          </div>
    )}
