import { React } from "react";
import { useState,useEffect } from "react";
import axios from "axios";


// export const deleteUser = (idUser,e)  =>{
//     e.preventDefault();
//     
//     if(window.confirm("Вы действительно хотите удалить пользователя?")){
//       axios.delete(url)
//       .then((result) =>{
//         console.log(result.data);
//         return(result.data)
//       })
//       .catch((error)=>{
//         console.log(error);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
//       })
//     }
// };

export const useDeleteUsers = (url) =>{
  const [users, setUsers] = useState({});
  useEffect(() => {
    if(window.confirm("Вы действительно хотите удалить пользователя?")){
      axios.delete(url)
          .then((result) => {
              setUsers(result.users);
          })
          .catch((error) => {
            console.log(error); 
          });
    }
  }, [url]);
  return {users}
}