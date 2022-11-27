import React, { useState } from "react";

import { Link} from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "../button/Button";

export const Auth = () =>{

    const css = require('../authorize/Registration.scss').toString();
    
    const [login, setLogin] = useState('');
    const [password, setPussword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) =>{
        e.preventDefault();
        const loginUser = {
            login: login,
            password: password
        }
        const response = await fetch(`https://localhost:44344/api/users/login`,{
            method: `POST`,
            headers:{'Content-Type': 'application/json'},
            credentials: 'include',
            body: loginUser
        });
        const content = await response.json;
        console.log(content);
    }

    const classnames = {
        form: 'form',
        smallText: 'form-text',
        link: 'form-text-link',
        input: 'form-input',
        button: 'form-save'
    }
    return(
        <main>
                <Helmet>
                    <style>
                        {css}
                    </style>
                </Helmet>
                <form className = {classnames.form} onSubmit={submit}>
                    <h2>Войти</h2>
                    <p className={classnames.smallText}><Link to = '/registration' className={classnames.link}>Ещё не зарегистрировались?</Link></p>
                    <p>
                        <input 
                            type = "text" 
                            id = "inputLogin"
                            className = {classnames.input}
                            placeholder = "Login"
                            required autoFocus 
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
                            <Button text = {'Войти'} classnames = {classnames.button} type = {"submit"} />
                    </p>
                </form>
        </main>
    )
}