import React from "react";
import { useState, useEffect} from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { inputTitle } from "../../Constant";
import { roles } from "../../Constant";

import './User.scss';

export const User = () =>{

    const [name, setName] = useState('');
    const [surName, setSurname] = useState('');
    const [patronimyc, setPatronimyc] = useState('');
    const [login, setLogin] = useState('');
    const [mail, setMail] = useState('');
    const [role, setRole] = useState('');
    const [resultRole, setResult]  = useState('');

    const [idRole, setIdRole] = useState('');

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
            setMail(resp.data.mailUser);
            setRole(resp.data.userRole.name);
            setIdRole(resp.data.idRole);
            const r = roles.find((role) => role.idRole == resp.data.idRole)
            setResult(r);
        });

      }, [apiUrl,setUser,current]); 
      

    const changeUser = () => {
        const userChange = {
            idUser: current,
            surnameUser: surName,
            nameUser: name,
            patronimycUser: patronimyc,
            loginUser: login,
            mailUser: mail,
            userRole: role
        };

        console.log(userChange);
        if(window.confirm('Вы действительно хотите внести изменения?')){
            axios.put(apiUrl, userChange).then((result) =>{
                console.log(result.data);
                alert("Успешно")
            }).catch((e)=>{
                alert("Мы не смогли изменить данные(")
                console.log(e.response.request._response);
            })
        }
    }
 
    const classnames ={
        container: 'main-container',
        title: 'main-container-user',
        changeButton: 'main-container-user-change',
        form: 'main-container-form',
        childFirst: 'main-container-form-child1',
        childSecond: 'main-container-form-child2',
        child1Element: 'main-container-form-child1-item',
        child2Element: 'main-container-form-child2-item',
        input: 'main-container-form-child2-item-input',
        inputActive: 'main-container-form-child2-item-input active',
        buttonContainer: 'main-container-form-child2-box',
        button: 'main-container-form-child2-box-button'
    }
    
    return(
            <div className={classnames.container}>
                {user === undefined ? (<span>Loading...</span>) :
                <p className={classnames.title}> 
                    {"Пользователь: " + surName +" " + name +" " + patronimyc}
                </p>}
                <div className = {classnames.form}>
                    <div className = {classnames.childFirst}>
                        {inputTitle.map((item,index) =>
                            <p key = {index} className = {classnames.child1Element}>
                                <span>{item}</span>
                            </p>
                        )}
                    </div>
                    <div className = {classnames.childSecond}>
                        {user === undefined ? (<span>Loading...</span>) : 
                            <form>
                                <p className={classnames.child2Element }>{user.idUser}</p>
                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'text' 
                                        //defaultValue = {resultRole.name} 
                                        onChange={(e) => setRole(e.target.value)} />
                                </p>

                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'text' 
                                        defaultValue = {user.surnameUser} 
                                        onChange={(e) => setSurname(e.target.value)} />
                                </p>
                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'text' 
                                        defaultValue = {user.nameUser} 
                                        onChange={(e) =>setName(e.target.value)} 
                                        required />
                                </p>
                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'text' 
                                        defaultValue = {user.patronimycUser} 
                                        onChange={(e) =>setPatronimyc(e.target.value)}/>
                                </p>
                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'text' 
                                        defaultValue = {user.loginUser} 
                                        onChange={(e) =>setLogin(e.target.value)} 
                                        required />
                                </p>
                                <p className={classnames.child2Element} >
                                    <input 
                                        className={classnames.input}
                                        type = 'email' 
                                        defaultValue = {user.mailUser} 
                                        onChange={(e) =>setMail(e.target.value)} 
                                        required/>
                                </p>
                            </form>
                        }
                    </div>
                </div>
                <p className={classnames.buttonContainer}>
                    <Link to = {'/users'}><button className={classnames.button}>Назад</button></Link>
                    <button className={classnames.button} onClick={() => changeUser()}>Сохранить</button>
                </p>
            </div>
    )
}