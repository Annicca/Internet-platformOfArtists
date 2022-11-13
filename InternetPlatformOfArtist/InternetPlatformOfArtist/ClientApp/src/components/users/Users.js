import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

    return(
        <span>
            <p>Пользователи</p>
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
        </span>
    )}
