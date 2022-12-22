import { getCookie } from "react-use-cookie";

export const getRequestConfig = () =>{
    let token = getCookie('jwt');
    return ({headers: {Authorization: `Bearer ${token}`}});
}

export const getPostConfig = () =>{
    let token = getCookie('jwt');
    return ({headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}});
}