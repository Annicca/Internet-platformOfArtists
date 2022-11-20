import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {SearchIcon} from '../../icon/SearchIcon';
import { tabletitle , tableUsersImg} from "../../Constant";
import { Image } from "../img/Image";


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

    let navigate = useNavigate(); 
    const change = (id) =>{ 
      let path = `/users/${id}`; 
      navigate(path);
    }
    const addredirect = () =>{
      let pathAdd = ``;
      navigate(pathAdd);
    }
    
    const classnames = {
      container: 'main-container',
      titlePage: 'main-container-title',
      form: 'main-container-form',
      submit: 'main-container-form-search-button',
      search: 'main-container-form-search-button-img',
      formContainer: 'main-container-form-search',
      inputSearch: 'main-container-form-search-input',
      table: 'main-container-table',
      tableButton: 'main-container-table-button',
      addButton: 'main-container-table-button_add'
    }

    return(
        <main>
            <div className = {classnames.container}>
            <h1 className = {classnames.titlePage}>Пользователи</h1>
            <div>
              <form className = {classnames.formContainer}>
                    <input placeholder="Введите логин" className = {classnames.inputSearch}/>
                    <button type = "submit" className = {classnames.submit}>
                      <SearchIcon className = {classnames.search}/>
                    </button>
                {/* <div className = {classnames.formContainer}>

                </div> */}
              </form>
            </div>
            <table className = {classnames.table}>
              {/* <div className={classnames.addBox}>
                
              </div> */}
              <tbody>
                <tr>
                  <td colSpan={tabletitle.length}>
                    <button className = {classnames.addButton} onClick={() => addredirect()}>+</button>
                  </td>
                </tr>
                <tr>
                  {tabletitle.map((item,index) =>
                    <th key = {index}>{item}</th>
                  )}
                </tr>
                {data === undefined ? (<div>Loading...</div>) : data.map(data => 
                  <tr>
                    <td>{data.loginUser}</td>
                    <td>{data.surnameUser +" " + data.nameUser +" " + data.patronimycUser}</td>
                    <td>{data.mailUser}</td>
                    <td>{data.phoneUser}</td>
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
                          alt = {tableUsersImg[2].alt}/>
                      </button>
                    </td>
                    {/* <td>
                      <Link to = {`/user/${data.idUser}`}><button>Изменить</button></Link>
                    </td>
                    <td>
                      <button onClick={(e) => deleteUser(data.idUser, e)}>Удалить</button>
                    </td> */}
                  </tr>
                )}
              </tbody>
            </table> 
            </div>
        </main>
    )}
