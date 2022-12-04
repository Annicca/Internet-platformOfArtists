import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { AuthTitle } from "./AuthTitle";
import { Button } from "../button/Button";
import { useForm } from "react-hook-form";
import {setCookie} from "react-use-cookie";

import './Registration.scss';

export const Login = () =>{

    const store =  require('store');
    // const css = require('./Registration.scss').toString();

    let navigate = useNavigate(); 

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () =>{
        const loginUser = {
            login : login,
            password : password
          }
        await axios({
            method: 'post',
            url: 'https://localhost:44344/api/users/login',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            data : JSON.stringify(loginUser)
        })
        .then((response) => {

            store.set('user', response.data.user);
            console.log(store.get('user'));
            //setUser(response.data.user);
            setCookie('jwt', response.data.token, {
                path:"/"
            });
            alert(response.data.message);
            
        })
        .then(() => navigate(`/`))
        .catch((error) =>{
            alert('Вы ввели неправильно логин или пароль(')
            console.log(error);
        })
    }

    const classnames = {
        container: 'container-auth',
        form: 'form authorize',
        title: 'registration authorize',
        link: 'authorize-link',
        group : 'form-group',
        error: 'form-group-error',
        input: 'form-group-input',
        label : 'form-group-label',
        button: 'form-save authorize'
    }

    return(
        <div className={classnames.container}>
                    <form className = {classnames.form} onSubmit={handleSubmit(onSubmit)}>
                        <AuthTitle classnames={classnames} title = {'Вход'} linkText = {'Ещё не зарегистрировались?'} path = {'/signin'} />
                        <div className = {classnames.group}>
                            
                            <input 
                                type = "text" 
                                {...register('login',{
                                    required : 'Поле обязательно',
                                    minLength: {value: 5, message: 'Длина не менее 5 символов'},
                                    pattern: {value: /^[A-Za-z0-9]+$/, message: "Логин должен содержать только буквы латинского алфавита и цифры"}
                                })}
                                className = {classnames.input}
                                placeholder =  " "
                                autoFocus 
                                onChange = {(e) => setLogin(e.target.value)} />
                                <label className = {classnames.label}>Login</label>
                                {errors?.login && <p className = {classnames.error}>{errors?.login?.message}</p>}
                        </div>
                        <div className = {classnames.group}>
                            
                            <input 
                                type ="password"
                                {...register('password', {
                                    required : 'Поле обязательно',
                                    minLength: {value: 8, message: 'Длина не менее 8 символов'},
                                    pattern:{value: /[0-9]/, message: "Пароль должен содержать цифры"},
                                    pattern: {value: /^[A-Za-z]$/, message: "Пароль должен содержать буквы латинского алфавита"},
                                    pattern:{value: /[!@#$%^&*]/, message: "Пароль должен содержать хотя бы 1 спецсимвол"}
                                })}
                                className = {classnames.input}
                                placeholder = " "
                                onChange = {(e) => setPassword(e.target.value)} />
                                <label className = {classnames.label}>Password</label>
                                {errors?.password && <p className = {classnames.error}>{errors?.password?.message}</p>}
                        </div>
                        <p>
                                <Button text = {'Войти'} classnames = {classnames.button} type = {"submit"} />
                        </p>
                    </form>
        </div>
    )
}