import React from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { useNavigate } from "react-router-dom";
import { TableUser } from "../TableAdmin/TableUser";

import { useEffect } from "react";


export const Users = () =>{

  let navigate = useNavigate();
  const store = require('store');
  const user = store.get('user');

  useEffect(() =>{
    if(user?.idRole != 1){
      navigate(`/notfound`)
    }
  }, [user])

  return(
    <div className="main-container">
      <TitlePage title = 'Пользователи' />
      <TableUser />
    </div>
  )
}

