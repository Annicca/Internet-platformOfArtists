import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {SearchIcon} from '../../icon/SearchIcon';

import './Users.scss';

export const Users = () =>{

    const deleteUser = (idUser,e)  =>{
      e.preventDefault();
      const url= `https://localhost:44344/api/users/${idUser}`;
      if(window.confirm("Вы действительно хотите удалить пользователя?")){
        axios.delete(url).then((result) =>{
          console.log(result.data);
          setState(result.data)})
          .catch((error)=>{
            console.log(error);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
          })
      }
    };

    const [data, setState] = useState();

    useEffect(() => {
      // fetch data
      const dataFetch = async () => {
        const data = await (
          await fetch(
            "https://localhost:44344/api/users"
          )
        ).json();
  
        // set state when the data received
        setState(data);
      };
  
      dataFetch();
    }, []);
    
    const classnames = {
      container: 'main-container',
      titlePage: 'main-container-title',
      form: 'main-container-form',
      submit: 'main-container-form-search-button',
      search: 'main-container-form-search-button-img',
      formContainer: 'main-container-form-search',
      inputSearch: 'main-container-form-search-input'

    }

    return(
        <main>
            <div className = {classnames.container}>
            <h1 className = {classnames.titlePage}>Пользователи</h1>
            <div>
              <form className = {classnames.form}>
                <div className = {classnames.formContainer}>
                    <input placeholder="Введите логин" className = {classnames.inputSearch}/>
                    <button type = "submit" className = {classnames.submit}>
                      <SearchIcon className = {classnames.search}/>
                    </button>
                </div>
              </form>
            </div>
            <table>
              <tbody>
              <tr>
                <th>ФИО</th>
                <th>Email</th>
              </tr>
              {data === undefined ? (<div>Loading...</div>) : data.map(data => 
            <tr>
              <td>{data.surnameUser +" " + data.nameUser +" " + data.patronimycUser}</td>
              <td>{data.mailUser}</td>
              <td>
                <Link to = {`/user/${data.idUser}`}><button>Изменить</button></Link>
              </td>
              <td>
                <button onClick={(e) => deleteUser(data.idUser, e)}>Удалить</button>
              </td>
            </tr>
            )}
              </tbody>
            </table> 
            </div>
        </main>
    )}
