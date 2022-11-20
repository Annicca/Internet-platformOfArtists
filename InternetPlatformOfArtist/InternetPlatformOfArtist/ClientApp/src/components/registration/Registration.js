import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export const Registration = () =>{

    const [surName, setSurName] = useState('');
    const [name, setName] = useState('');
    const [patronimyc, setPatronimyc] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPussword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) =>{
        e.preventDefault();
        const user =
            {
                surnameUser: surName,
                nameUser: name,
                patronimycUser: patronimyc,
                loginUser: login,
                passwordUser: password,
                mailUser: email
            }
        const response = await fetch(`https://localhost:44344/api/users/register`,{
            method: `POST`,
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        const content = await response.json;

        console.log(content);

        setRedirect(true);
        if(redirect){
            return <Navigate to="/login" />
        }

    }

    const classnames = {
        container: 'main-container',
        form: 'main-container-register',
        input: 'main-container-register-input',
        button: 'main-container-register-save'
    }

    return(
        <main>
            <div className = {classnames.container}>
                <form className = {classnames.form} onSubmit = {submit} >
                    <h2>Пожалуйста зарегистрируйтесь</h2>
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
                    <button className = {classnames.button} type = "submit">Зарегистрироваться</button>
                    </p>
                </form>
            </div>
        </main>
)}