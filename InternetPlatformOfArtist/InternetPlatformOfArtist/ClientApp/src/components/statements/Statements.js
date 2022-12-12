import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { TitlePage } from "../TitlePage/TitlPage";
import { TableStatement } from "../TableAdmin/TableStatement";

export const Statements = () =>{

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
            <TitlePage title = 'Заявки' />
            <TableStatement />
        </div>
    )
}