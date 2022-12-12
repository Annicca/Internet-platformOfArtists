import React, {useEffect, useState} from "react";
import { handleValue } from "../helpers/handleValue";
import { SearchForm } from "../SearchForm/SearchForm";
import classNames from "classnames";
import { tablestatement, tableUsersImg } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { Image } from "../img/Image";

import './Table.scss';
import axios from "axios";



export const TableStatement = () =>{

    const [statement, setStatement] = useState();
    const [numberSearch, setNumberSearch] = useState('');
    let accept = 1;
    let reject = 2;
  
    const url = "https://localhost:44344/api/statementes";
    const urlSearch = `https://localhost:44344/api/statementes/${numberSearch}`;

    let navigate = useNavigate();

    const redirected = (id) =>{ 
        let path = `/statements/${id}`; 
        navigate(path);
      }
    
    useEffect(() => {
  
          const urlData = handleValue(numberSearch, url, urlSearch);
          const dataFetch = async (urlData) => {
            const data = await (
              await fetch(urlData)).json();
              console.log(data);
              setStatement(data);
          };
          dataFetch(urlData);
  
    }, [numberSearch]);

    const changeStatus = async(idStatement, idStatus, e) =>{
      e.preventDefault();
      let message;
      if(idStatus == accept){
        message = "Вы действительно хотите принять заявку?"
      } else{
        message  = "Вы действительно хотите отклонить заявку?"
      }
      if(window.confirm(message)){
          await axios.put(`https://localhost:44344/api/statementes/${idStatement}/${idStatus}`)
          .then((result) => {
            console.log(result.data);
            setStatement(result.data);
          })
          .catch((error) => console.log(error))
      };
    }

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
                    <button className = {classnames.tableButton} onClick={(e) => changeStatus(statement.idStatement, accept, e)}>
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
                    <button className = {classnames.tableButton} onClick={(e) => changeStatus(statement.idStatement, reject, e)}>
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