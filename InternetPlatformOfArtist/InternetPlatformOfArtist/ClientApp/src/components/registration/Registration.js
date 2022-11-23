import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "../button/Button";

export const Registration = () =>{
    const [surName, setSurName] = useState('');
    const [name, setName] = useState('');
    const [patronimyc, setPatronimyc] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPussword] = useState('');

    let navigate = useNavigate(); 

    const css = require('./Registration.scss').toString();

    const submit = (e) =>{
        e.preventDefault();
        const user =
            {
                surnameUser: surName,
                nameUser: name,
                patronimycUser: patronimyc,
                loginUser: login,
                passwordUser: password,
                mailUser: email
            };

        axios({
            method: 'post',
            url: 'https://localhost:44344/api/users/register',
            headers: {'Content-Type': 'application/json'},
            data : JSON.stringify(user)
        })
        .then(() => navigate(`/login`))
        .catch((error) =>{
            console.log(error);
        })
    }

    const classnames = {
        form: 'form',
        smallText: 'form-text',
        link: 'form-text-link',
        input: 'form-input',
        button: 'main-container-register-save'
    }


    return(
            <main>
                <Helmet>
                    <style>
                        {css}
                    </style>
                </Helmet>
                <form className = {classnames.form} onSubmit = {submit} >
                        <h2>Регистрация</h2>
                        <p className = {classnames.smallText}>
                            <Link to = '/login' className={classnames.link}>Уже зарегистрированы?</Link>
                        </p>
                        <p>
                            <input 
                                type = "text" 
                                id = "inputSurname"
                                className = {classnames.input}
                                placeholder = "Фамилия"
                                required autoFocus 
                                onChange = {(e) => setSurName(e.target.value)} />
                        </p>
                        <p>
                            <input 
                                type = "text" 
                                id = "inputName"
                                className = {classnames.input}
                                placeholder = "Имя"
                                required 
                                onChange = {(e) => setName(e.target.value)} />
                        </p>
                        <p>
                            <input 
                                type = "text" 
                                id = "inputPatronimyc"
                                className = {classnames.input}
                                placeholder = "Отчество"
                                required 
                                onChange = {(e) => setPatronimyc(e.target.value)} />
                        </p>
                        <p>
                            <input 
                                type = "email" 
                                id = "inputEmail"
                                className = {classnames.input}
                                placeholder = "Email"
                                required 
                                onChange = {(e) => setEmail(e.target.value)} />
                        </p>
                        <p>
                            <input 
                                type = "text" 
                                id = "inputLogin"
                                className = {classnames.input}
                                placeholder = "Login"
                                required 
                                onChange = {(e) => setLogin(e.target.value)} />
                        </p>
                        <p>
                            <input 
                                type ="password"
                                id = "inputPassword"
                                className = {classnames.input}
                                placeholder = "Password"
                                required 
                                onChange = {(e) => setPussword(e.target.value)} />
                        </p>
                        <p>
                        <Button>Зарегистрироваться</Button>
                        <button className = {classnames.button} type = "submit">Зарегистрироваться</button>
                        </p>
                    </form>
            </main>          
)}