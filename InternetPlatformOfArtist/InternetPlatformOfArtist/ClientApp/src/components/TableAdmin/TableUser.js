import React from "react";
import { useState,useEffect } from "react";
import { tabletitle , tableUsersImg} from "../../Constant";
import { Image } from "../img/Image";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleValue } from "../helpers/handleValue";
import { SearchForm } from "../SearchForm/SearchForm";
import { getRequestConfig } from "../helpers/getRequestConfig";

import './Table.scss';


export const TableUser = () =>{

  let navigate = useNavigate(); 
  const change = (id) =>{ 
    let path = `/users/${id}`; 
    navigate(path);
  }

  const [data, setState] = useState();
  const [loginSearch, setLoginSearch] = useState('');

  const url = "https://localhost:44344/api/users";
  const urlSearch = `https://localhost:44344/api/users/userLogin/${loginSearch}`;
  
  useEffect(() => {

        const urlData = handleValue(loginSearch, url, urlSearch);
        const getUsers = async (urlData) => {
          const response = await axios(urlData, getRequestConfig());
          setState(response.data);
        };
        getUsers(urlData);

  }, [loginSearch]);

  const deleteUser = (idUser,e)  =>{
        e.preventDefault();
        const url = `https://localhost:44344/api/users/${idUser}`;
        if(window.confirm("Вы действительно хотите удалить пользователя?")){
            axios.delete(url, getRequestConfig())
            .then((result) =>{
                console.log(result.data);
                setState(result.data)
            })
            .catch((error)=>{
                console.log(error);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            })
        }
  };

  const classnames = {
        table: 'table',
        tableButton: 'table-button',
        addButton: 'table-button_add',
        status: 'status'
  }

    return(
      <>
        <SearchForm searchText = {'Введите логин'} setValue = {setLoginSearch} />
        <table className = {classnames.table}>
        <tbody>
          <tr>
            {tabletitle.map((item,index) =>
              <th key = {index}>{item}</th>
            )}
          </tr>
          {data === undefined ? (<p>Loading...</p>) : data.map((data,index) => 
            <tr key = {index}>
              <td>{data.loginUser}</td>
              <td>{data.surnameUser +" " + data.nameUser +" " + data.patronimycUser}</td>
              <td>{data.mailUser}</td>
              {data.phoneUesr != null ? <td>{data.phoneUser}</td> : <td>-</td> }
              <td>
                <button className = {classnames.tableButton} onClick={() => change(data.idUser)}>
                  <Image 
                    src = {tableUsersImg[0].src}
                    alt = {tableUsersImg[0].alt}/>
                </button>
              </td>
              <td>
              <button className = {classnames.tableButton} onClick={(e) => deleteUser(data.idUser, e)}>
              
                <Image 
                    src = {tableUsersImg[2].src}
                    alt = {tableUsersImg[2].alt} 
                    width = {30} height = {30} />
                </button>
              </td>
             </tr>
          )}
        </tbody>
      </table> 
      </>
    )
}