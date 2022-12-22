import axios from "axios";
import { getRequestConfig } from "./getRequestConfig";

export const changeStatus = async(idStatement, idStatus, setStatement) =>{
    let accept = 1;
    let message;
    if(idStatus == accept){
      message = "Вы действительно хотите принять заявку?"
    } else{
      message  = "Вы действительно хотите отклонить заявку?"
    }
    if(window.confirm(message)){
        await axios.put(`https://localhost:44344/api/statementes/${idStatement}/${idStatus}`, {}, getRequestConfig())
        .then((result) => {
          console.log(result.data);
          setStatement(result.data);
          alert("Успешно");
        })
        .catch((error) => console.log(error))
    };
  }