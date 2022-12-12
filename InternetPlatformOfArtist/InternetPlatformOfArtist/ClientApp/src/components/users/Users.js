import React from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { useNavigate } from "react-router-dom";
import { TableUser } from "../TableAdmin/TableUser";

import { useEffect } from "react";


export const Users = () =>{

  let navigate = useNavigate();
  const store = require('store');
  const user = store.get('user');
  const role = 1 //user.idRole;

  useEffect(() =>{
    if(role != 1){
      navigate(`/*`)
    }
  }, [role])

    return(
          <div className="main-container">
            <TitlePage title = 'Пользователи' />
            <TableUser />
          </div>
    )}

