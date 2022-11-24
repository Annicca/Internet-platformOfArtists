import React from "react";
import { useState,useEffect } from "react";
import { tabletitle , tableUsersImg} from "../../Constant";
import { Image } from "../img/Image";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './Table.scss';

export const TableUser = () =>{

    let navigate = useNavigate(); 
    const change = (id) =>{ 
      let path = `/users/${id}`; 
      navigate(path);
    }
    const addredirect = () =>{
      let pathAdd = ``;
      navigate(pathAdd);
    }

    const [data, setState] = useState();

    useEffect(() => {
      const dataFetch = async () => {
        const data = await (
          await fetch(
            "https://localhost:44344/api/users"
          )
        ).json();

        setState(data);
      };
  
      dataFetch();
    }, []);

    const deleteUser = (idUser,e)  =>{
        e.preventDefault();
        const url = `https://localhost:44344/api/users/${idUser}`;
        if(window.confirm("Вы действительно хотите удалить пользователя?")){
            axios.delete(url)
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
        addButton: 'table-button_add'
      }

    return(
        <table className = {classnames.table}>
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
          {data === undefined ? (<div>Loading...</div>) : data.map((data,index) => 
            <tr key = {index}>
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
             </tr>
          )}
        </tbody>
      </table> 
    )
}