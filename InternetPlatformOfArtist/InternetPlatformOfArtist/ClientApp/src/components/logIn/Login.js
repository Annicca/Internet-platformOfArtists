import React, { useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";


export const Login = () =>{

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
            credentials: `include`,
            body: JSON.stringify(loginUser)
        });
        const content = await response.json;
        console.log(content);

        setRedirect(true);
        if(redirect){
            return <Redirect to="/" />
        }
    }

    const classnames = {
        container: 'main-container',
        form: 'main-container-login',
        input: 'main-container-login-input',
        button: 'main-container-login-signin'
    }
    return(
        <main>
            <div className = {classnames.container}>
                <form className = {classnames.form} onSubmit={submit}>
                    <h2>Войти</h2>
                    <p><Link to = '/registration' >Ещё не зарегистрировались?</Link></p>
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
                        <button className = {classnames.button} type = "submit">Войти</button>

                    </p>
                </form>
            </div>
        </main>
    )
}