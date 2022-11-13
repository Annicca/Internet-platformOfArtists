import React from "react";
import { useState, useEffect} from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";



export const User = () =>{

    const [name, setName] = useState('');
    const [surName, setSurname] = useState('');
    const [patronimyc, setPatronimyc] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');

    const params = useParams();
    const current = params.id;
    const [user, setUser] = useState();

    const apiUrl = `https://localhost:44344/api/users/${current}`;

    useEffect(() => {
        axios.get(apiUrl).then((resp) => {
            console.log(resp.data);
            setUser(resp.data);
            setSurname(resp.data.surnameUser);
            setName(resp.data.nameUser);
            setPatronimyc(resp.data.patronimycUser);
            setLogin(resp.data.loginUser);
            setPassword(resp.data.passwordUser);
            setMail(resp.data.mailUser);

        });
      }, [apiUrl,setUser,current]);  



    const changeUser = () => {
        const userChange = {
            idUser: current,
            surnameUser: surName,
            nameUser: name,
            patronimycUser: patronimyc,
            loginUser: login,
            passwordUser: password,
            mailUser: mail
        };
        if(window.confirm('Вы действительно хотите внести изменения?')){
            axios.put(apiUrl, userChange).then((result) =>{
                console.log(result.data);
            }).catch((e)=>{
                console.log(e.response.request._response);
            })
        }
    }
    const inputTitle = ['Номер', 'Фамилия', 'Имя', 'Отчество', 'Login', 'Пароль', 'Email']
    return(
        <div>
            {user === undefined ? (<span>Loading...</span>) :
            <p>
                Пользователь: 
                <span>
                    {" " + user.surnameUser +" " + user.nameUser +" " + user.patronimycUser}
                </span>
            </p>}
            <div>
                {inputTitle.map((item,index) =>
                    <p key = {index}>{item}</p>
                )}
            </div>
            <div>
            {user === undefined ? (<span>Loading...</span>) : 

                <form>
                    <p><input type = 'number' value = {user.idUser} readOnly /></p>
                    <p><input type = 'text' defaultValue = {user.surnameUser} onChange={(e) =>setSurname(e.target.value)} required /></p>
                    <p><input type = 'text' defaultValue = {user.nameUser} onChange={(e) =>setName(e.target.value)} required /></p>
                    <p><input type = 'text' defaultValue = {user.patronimycUser} onChange={(e) =>setPatronimyc(e.target.value)}/></p>
                    <p><input type = 'text' defaultValue = {user.loginUser} onChange={(e) =>setLogin(e.target.value)} required /></p>
                    <p><input type = 'password' defaultValue = {user.passwordUser} onChange={(e) =>setPassword(e.target.value)} required /></p>
                    <p><input type = 'email' defaultValue = {user.mailUser} onChange={(e) =>setMail(e.target.value)} required/></p>
                    <p><button onClick={() => changeUser()}>Сохранить</button></p>
                </form>
            }
            <Link to = {'/users'}><button >Назад</button></Link>
            </div>
        </div>
    )
}