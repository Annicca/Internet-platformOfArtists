import React, { useState } from "react";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { AuthTitle } from "./AuthTitle";
import { Helmet } from "react-helmet";
import { Button } from "../button/Button";
import { useForm } from "react-hook-form";

export const Login = () =>{

    const css = require('./Registration.scss').toString();

    let navigate = useNavigate(); 

    const {
        register,
        formState: {errors, isValid},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () =>{
        const loginUser = {
            login: login,
            password: password
        }
        alert(loginUser.login + ' ' + loginUser.password);
        axios({
            method: 'post',
            url: `https://localhost:44344/api/users/login`,
            headers: {'Content-Type': 'application/json'},
            credentials: `include`,
            data : JSON.stringify(loginUser)
        })
        .then(() => navigate(`/`))
        .catch((error) =>{
            console.log(error);
        })
    }

    const classnames = {
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
        <main>
                <Helmet>
                    <style>
                        {css}
                    </style>
                </Helmet>
                <form className = {classnames.form} onSubmit={handleSubmit(onSubmit)}>
                    <AuthTitle classnames={classnames} title = {'Вход'} linkText = {'Ещё не зарегистрировались?'} path = {'/signin'} />
                    <div className = {classnames.group}>
                        
                        <input 
                            type = "text" 
                            {...register('login',{
                                required : 'Поле обязательно',
                                minLength: {value: 5, message: 'Длина не менее 5 символов'},
                                pattern: {value: /^[A-Za-z]$/, message: "Логин должен содержать только буквы латинского алфавита"}
                            })}
                            className = {classnames.input}
                            placeholder = "Login"
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
                            placeholder = "Password"
                            onChange = {(e) => setPassword(e.target.value)} />
                            <label className = {classnames.label}>Password</label>
                            {errors?.password && <p className = {classnames.error}>{errors?.password?.message}</p>}
                    </div>
                    <p>
                            <Button text = {'Войти'} valid = {!isValid} classnames = {classnames.button} type = {"submit"} />
                    </p>
                </form>
        </main>
    )
}