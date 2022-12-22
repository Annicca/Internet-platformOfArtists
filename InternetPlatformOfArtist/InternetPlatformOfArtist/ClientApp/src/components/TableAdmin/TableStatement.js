import React, {useEffect, useState} from "react";
import { handleValue } from "../helpers/handleValue";
import { SearchForm } from "../SearchForm/SearchForm";
import classNames from "classnames";
import { tablestatement, tableUsersImg } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { Image } from "../img/Image";
import { changeStatus } from "../helpers/changeStatus";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";

import './Table.scss';

export const TableStatement = () =>{
    const store = require('store');
    const user = store.get('user');

    const [statement, setStatement] = useState();
    const [numberSearch, setNumberSearch] = useState('');
    let accept = 1;
    let reject = 2;
  
    const url = "https://localhost:44344/api/statementes";
    const urlSearch = `https://localhost:44344/api/statementes/search/${numberSearch}`;

    let navigate = useNavigate();

    const redirected = (id) =>{ 
        let path = `/statements/${id}`; 
        navigate(path);
      }
    
    useEffect(() => {
          if(user?.idRole != 1){
            navigate(`/notfound`)
          }
          const urlData = handleValue(numberSearch, url, urlSearch);
          const getStatements = async (urlData) => {
            const response = await axios.get(urlData, getRequestConfig());
            console.log(response.data);
            setStatement(response.data);
          };
          getStatements(urlData);
  
    }, [numberSearch]);

    const classnames = {
        table: 'table',
        statement: 'table_statement',
        tableButton: 'table-button',
        addButton: 'table-button_add',
        status: 'status',
    }

    return(
        <>
          <SearchForm searchText = {'Введите номер заявки'} setValue = {setNumberSearch} />
          <table className = {classNames(classnames.table, classnames.statement)}>
            <tbody>
              <tr>
                {tablestatement.map((item,index) =>
                  <th key = {index}>{item}</th>
                )}
              </tr>
              {statement === undefined ? (<p>Loading...</p>) : statement.map((statement,index) => 
                <tr key = {index}>
                  <td>{statement.idStatement}</td>
                  <td>{statement.user.surnameUser +" " + statement.user.nameUser +" " + statement.user.patronimycUser}</td>
                  <td>{statement.type.nameType}</td>
                  <td>{statement.name}</td>
                  <td>{statement.city}</td>
                  <td>
                    <button className = {classnames.tableButton} onClick={() => redirected(statement.idStatement)}>
                      <Image 
                        src = {tableUsersImg[0].src}
                        alt = {tableUsersImg[0].alt}/>
                    </button>
                  </td>
                  {statement.idStatusStatement != null ?
                  <td>
                    <button className = {classnames.tableButton}>
                    {statement.idStatusStatement == accept ?
                      <span className= {classnames.status}>{statement.status.nameStatus}</span> :
                      <span className= {classnames.status}>-</span> }
                    </button>
                  </td> :
                  <td>
                    <button className = {classnames.tableButton} onClick={() => changeStatus(statement.idStatement, accept, setStatement)}>
                      <span className= {classnames.status}><Image src = './icons/accept.svg' alt = 'Принять' width = {30} height = {30} /></span>
                    </button>
                  </td> 
                  }
                  {statement.idStatusStatement != null ?
                  <td>
                    <button className = {classnames.tableButton}>
                      {statement.idStatusStatement == reject ?
                      <span className= {classnames.status}>{statement.status.nameStatus}</span> :
                      <span className= {classnames.status}>-</span>
                      }
                    </button>
                  </td> :
                  <td>
                    <button className = {classnames.tableButton} onClick={() => {changeStatus(statement.idStatement, reject, setStatement)}}>
                      <span className= {classnames.status}><Image src = './icons/del.svg' alt = 'Отклонить' width = {30} height = {30} /></span>
                    </button>
                  </td> 
                  }
                </tr>
              )}
            </tbody>
          </table> 
        </>
    )
}