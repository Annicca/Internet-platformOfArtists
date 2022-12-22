import { getCookie } from "react-use-cookie";

export const getRequestConfig = () =>{
    let token = getCookie('jwt');
    return ({headers: {Authorization: `Bearer ${token}`}});
}