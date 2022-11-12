import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

export const Users = () =>{
    const changeUser = () =>{

    }
    const deleteUser = (idUser,e)  =>{
      e.preventDefault();
      const url= `https://localhost:44344/api/users/${idUser}`;
      axios.delete(url).then((result) =>{
        alert(result.data);
        setState(result.data)})
        .catch((error)=>{
          alert(error);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        })
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
        <div>
            <p>Пользователи</p>
            <table>
              <tr>
                <th>ФИО</th>
                <th>Email</th>
              </tr>
              {data === undefined ? (<div>Loading...</div>) : data.map(data => 
            <tr>
              <td>{data.idUser}</td>
              <td>{data.surnameUser +" " + data.nameUser +" " + data.patronimycUser}</td>
              <td>{data.mailUser}</td>
              <td>
                <button onClick={() => changeUser()}>Изменить</button>
              </td>
              <td>
                <button onClick={(e) => deleteUser(data.idUser, e)}>Удалить</button>
              </td>
            </tr>
            )}
            </table> 
        </div>
    )}
