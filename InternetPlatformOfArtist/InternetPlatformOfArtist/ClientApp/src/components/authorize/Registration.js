import axios from "axios";
import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "../button/Button";
import { AuthTitle } from "./AuthTitle";
import { useForm } from "react-hook-form";

export const Registration = () =>{
    const [surName, setSurName] = useState('');
    const [name, setName] = useState('');
    const [patronimyc, setPatronimyc] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPussword] = useState('');

    let navigate = useNavigate(); 

    const css = require('./Registration.scss').toString();

    
    const {
        register,
        watch,
        formState: {errors, isValid},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (e) =>{
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
        title: 'registration',
        link: 'registration-link',
        error: 'form-group-error',
        group: 'form-group',
        input: 'form-group-input',
        label : 'form-group-label',
        button: 'form-save'
    }

    return(
            <main>
                <Helmet>
                    <style>
                        {css}
                    </style>
                </Helmet>
                <form className = {classnames.form} onSubmit = {handleSubmit(onSubmit)} >
                        <AuthTitle classnames={classnames} title = {'Регистрация'} linkText = {'Уже зарегистрированы?'} path = {'/login'} />
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                name = "surName"
                                {...register('surName',{
                                    required : 'Поле обязательно',
                                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                                })}
                                className = {classnames.input}
                                placeholder = " "
                                required autoFocus 
                                onChange = {(e) => setSurName(e.target.value)} />
                                <label className = {classnames.label}>Фамилия</label>
                                {errors?.surName && <p className = {classnames.error}>{errors?.surName?.message}</p>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                name = "name"
                                {...register('name',{
                                    required : 'Поле обязательно',
                                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                                })}
                                className = {classnames.input}
                                placeholder = " "
                                required 
                                onChange = {(e) => setName(e.target.value)} />
                                <label className = {classnames.label}>Имя</label>
                                {errors?.name && <p className = {classnames.error}>{errors?.name?.message}</p>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                name = "patronimyc"
                                {...register('patronimyc',{
                                    required : 'Поле обязательно',
                                    pattern: {value: /^([A-Za-zА-Яа-яЁё]+$)/, message: "Поле должно содержать только буквы"}
                                })}
                                className = {classnames.input}
                                placeholder = " "
                                required 
                                onChange = {(e) => setPatronimyc(e.target.value)} />
                                <label className = {classnames.label}>Отчество</label>
                                {errors?.patronimyc && <p className = {classnames.error}>{errors?.patronimyc?.message}</p>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type = "email" 
                                name = "email"
                                {...register('email',{
                                    required : 'Поле обязательно',
                                    pattern: {value: /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]/, message: "Неккоректно введён Email"}
                                })}
                                className = {classnames.input}
                                placeholder = " "
                                required 
                                onChange = {(e) => setEmail(e.target.value)} />
                                <label className = {classnames.label}>Email</label>
                                {errors?.email && <p className = {classnames.error}>{errors?.email?.message}</p>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                name = "login"
                                {...register('login',{
                                    required : 'Поле обязательно',
                                    minLength: {value: 5, message: 'Длина не менее 5 символов'},
                                    pattern: {value: /^[A-Za-z]$/, message: "Логин должен содержать только буквы латинского алфавита"},
                                })}
                                className = {classnames.input}
                                placeholder = " "
                                required 
                                onChange = {(e) => setLogin(e.target.value)} />
                                <label className = {classnames.label}>Login</label>
                                {errors?.login && <p className = {classnames.error}>{errors?.login?.message}</p>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type ="password"
                                name = "password"
                                {...register('password', {
                                    required : 'Поле обязательно',
                                    minLength: {value: 8, message: 'Длина не менее 8 символов'},
                                    pattern:{value: /[0-9]/, message: "Пароль должен содержать цифры"},
                                    pattern: {value: /^[A-Za-z]$/, message: "Пароль должен содержать буквы латинского алфавита"},
                                    pattern:{value: /[!@#$%^&*]/, message: "Пароль должен содержать хотя бы 1 спецсимвол"}
                                })}
                                className = {classnames.input}
                                placeholder = " "
                                required 
                                onChange = {(e) => setPussword(e.target.value)} />
                                <label className = {classnames.label}>Password</label>
                                {errors?.password && <p className = {classnames.error}>{errors?.password?.message}</p>}
                        </div>
                        <div className = {classnames.group}>
                           
                            <input 
                                type ="password"
                                name = "confirmPassword"
                                {...register('confirmPassword', {
                                    required : 'Поле обязательно',
                                    minLength: {value: 8, message: 'Длина не менее 8 символов'},
                                    pattern:{value: /[0-9]/, message: "Пароль должен содержать цифры"},
                                    pattern: {value: /^[A-Za-z]$/, message: "Пароль должен содержать буквы латинского алфавита"},
                                    pattern:{value: /[!@#$%^&*]/, message: "Пароль должен содержать хотя бы 1 спецсимвол"},
                                    validate : (val) => {
                                        if (watch('password') != val) {
                                          return "Пароли не совпадают";
                                        }}
                                })}
                                className = {classnames.input}
                                placeholder = " "
                                required 
                                onChange = {(e) => setPussword(e.target.value)} />
                                <label className = {classnames.label}>Повторите пароль</label>
                                {errors?.confirmPassword && <p className = {classnames.error}>{errors?.confirmPassword?.message}</p>}
                        </div>
                        <p>
                            <Button text = {'Регистрация'} valid = {!isValid} classnames = {classnames.button} type = {"submit"} />
                        </p>
                    </form>
            </main>          
)}