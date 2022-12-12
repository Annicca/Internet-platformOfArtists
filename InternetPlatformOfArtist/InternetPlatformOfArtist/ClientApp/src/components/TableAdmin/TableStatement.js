import React, {useEffect, useState} from "react";
import { handleValue } from "../helpers/handleValue";
import { SearchForm } from "../SearchForm/SearchForm";
import classNames from "classnames";
import { tablestatement, tableUsersImg } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { Image } from "../img/Image";

import './Table.scss';



export const TableStatement = () =>{

    const [statement, setStatement] = useState();
    const [numberSearch, setNumberSearch] = useState('');
  
    const url = "https://localhost:44344/api/statementes";
    const urlSearch = `https://localhost:44344/api/statementes/${numberSearch}`;

    let navigate = useNavigate();

    const change = (id) =>{ 
        let path = `/statements/${id}`; 
        navigate(path);
      }
    
    useEffect(() => {
  
          const urlData = handleValue(numberSearch, url, urlSearch);
          const dataFetch = async (urlData) => {
            const data = await (
              await fetch(urlData)).json();
              setStatement(data);
          };
          dataFetch(urlData);
  
    }, [numberSearch]);

    const classnames = {
        table: 'table',
        statement: 'table_statement',
        tableButton: 'table-button',
        addButton: 'table-button_add'
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
                <button className = {classnames.tableButton} onClick={() => change(statement.idStatement)}>
                  <Image 
                    src = {tableUsersImg[0].src}
                    alt = {tableUsersImg[0].alt}/>
                </button>
              </td>
              <td>
              <button className = {classnames.tableButton} >
                  <Image 
                    src = './icons/accept.svg'
                    alt = 'Принять'
                    width = {30}
                    height = {30}
                    />
                </button>
              </td>
              <td>
              <button className = {classnames.tableButton} >
                  <Image 
                    src = './icons/del.svg'
                    alt = 'Отклонить'
                    width = {30}
                    height = {30}
                    />
                </button>
              </td>
             </tr>
          )}
        </tbody>
      </table> 
        </>
    )
}