import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { TitlePage } from "../TitlePage/TitlPage";
import { TableStatement } from "../TableAdmin/TableStatement";

export const Statements = () =>{

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
            <TitlePage title = 'Заявки' />
            <TableStatement />
        </div>
    )
}