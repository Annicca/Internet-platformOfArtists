import React, {useState} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import {Image} from "../img/Image";
import { useForm } from "react-hook-form";
import { statementGroup, competitionForm } from "../../Constant";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import './AddStatement.scss';

export const AddStatement = () =>{

    const store = require('store');
    const user = store.get('user');

    let navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);
    const [type, setType] = useState();
    const[isDisabled, setDisabled] = useState(true);

    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [dateStart, setStart] = useState('');
    const [dateFinish, setFinish] = useState('');
    const [description, setDescription] = useState('');


    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = handleSubmit(async (data) => {
        // console.log(data);

        let statement = {
            idType: type,
            idUser: user.idUser,
            ...data,
        }
        console.log(statement);
        await axios({
            method: 'post',
            url: 'https://localhost:44344/api/statementes',
            headers: {'Content-Type': 'application/json'},
            data : JSON.stringify(statement)
        })
        .then(() => navigate('/mystatements'))
        .catch((error) =>{ 
            alert("Что-топошло не так");
            console.log(error);
        })
    })

    const handleChangeRadio = (e) =>{
        setType(e.target.value);
        setDisabled(false);
    }

    const classnames = {
        container: 'main-container',
        form: 'change statement',
        title: 'field-choose__title',
        radioContainer: 'form-container',
        radio: 'form-container__radio',
        choose: 'field-choose',
        open: 'field-open',
        button: 'form-container__then',
        active: 'field-active',
        buttonContainer: 'button-container',
        submitContainer: 'submit-container',
        submit: 'submit',
        message: 'message-statement',

        formContainer: 'change-container change-container_margin',
        group : 'change__group',
        error: 'change__error',
        input: 'change__input',
        textarea: 'change__textarea',
        labels: 'change-title',
        label : 'change-title__label',

        request: 'request'
    }

    const FormFooter = () =>{
        return(
            <div className={classNames(classnames.buttonContainer, classnames.submitContainer)}>
                <button className={classnames.button} onClick={(e) => {e.preventDefault(); setIsActive(!isActive)}} >
                    <Image src = './icons/leftarrow.svg' alt="Далее" width = {20} height = {20} />
                </button>
                <button type="submit" className={classnames.submit} >Подать заявку</button>
            </div>
        )
    }

    const FormStatement = () =>{
        return(
            <>
            <p className={classnames.message}>Внимание, если вы являетесь руководителем коллектива,то вы можете подать заявку только на размещение коллектива.
                <p>А если вы организатор конкурса, то только на размещение конкурса.</p>
            </p>
            
            <form className={classnames.form} onSubmit={onSubmit} >
                <fieldset className = {classNames(classnames.open, { 'field-active': !isActive})}>
                    <legend className={classnames.title}>
                        1. Выберете, что хотите разместить
                    </legend>
                    <div className={classnames.radioContainer}>
                        {user.idRole != 4 &&
                        <label htmlFor="radioGroup">
                            <input className = {classnames.radio} type="radio" name="idType" value ="1" id="radioGroup" checked={type === "1"} onChange={(e) => handleChangeRadio(e)}/>
                            <span>Коллектив</span>
                        </label>}
                        {user.idRole != 3 &&
                        <label htmlFor="radioCompetition">
                            <input className = {classnames.radio} type="radio" name="idType" value ="2" id = "radioCompetition" checked={type === "2"} onChange={(e) => handleChangeRadio(e)} />
                            <span>Конкурс</span>
                        </label>}
                        <div className={classnames.buttonContainer} >
                            <button className={classnames.button} disabled = {isDisabled} onClick={(e) => {e.preventDefault(); setIsActive(!isActive)}} >
                                <Image src = './icons/then.svg' alt="Далее" width = {20} height = {20} />
                            </button>
                        </div>
                    </div>
                </fieldset>
                {type === "1" && <fieldset  className = {classNames(classnames.open, { 'field-active': isActive && type == 1 })} >
                    <legend className={classnames.title} >
                        2. Заполните данные о коллективе
                    </legend>
                    <div className={classnames.formContainer}>
                        <div className={classnames.labels}>
                            {statementGroup.map((item,id) =>
                                <p className={classnames.label} key = {id}>{item}</p>
                            )}
                        </div>
                        <div> 
                            <div className = {classnames.group}>
                                <input 
                                    type = "text" 
                                    {...register('name',{
                                        required : 'Поле обязательно',
                                    })}
                                    className = {classnames.input}
                                    autoFocus  />
                                {errors?.name && < div className = {classnames.error}>{errors?.name?.message}</div>}
                            </div>
                            <div className = {classnames.group}>
                                <input 
                                    type = "text" 
                                    {...register('city',{
                                        required : 'Поле обязательно',
                                    })}
                                    className = {classnames.input} />
                                {errors?.city && < div className = {classnames.error}>{errors?.city?.message}</div>}
                            </div>
                            <div className = {classnames.group}>
                                <input 
                                    type ="text"
                                    {...register('address', {
                                        required : 'Поле обязательно',
                                    })}
                                    className = {classnames.input} />
                                {errors?.address && <div className = {classnames.error}>{errors?.address?.message}</div>}
                            </div>
                            <textarea className={classnames.textarea} cols={43} {...register('description')} />
                        </div>
                        
                    </div>
                    <FormFooter />
                </fieldset>}
                {type === "2" && <fieldset  className = {classNames(classnames.open, { 'field-active': isActive && type == 2 })} >
                    <legend className={classnames.title} >
                        2. Заполните данные о конкурсе
                    </legend>
                    <div className={classnames.formContainer}>
                        <div className={classnames.labels}>
                            {competitionForm.map((item,id) =>
                                <p className={classnames.label} key = {id}>{item}</p>
                            )}
                        </div>
                        <div> 
                            <div className = {classnames.group}>
                                <input 
                                    type = "text" 
                                    name="name"
                                    {...register('name',{
                                        required : 'Поле обязательно',
                                    })}
                                    className = {classnames.input}
                                    autoFocus />
                                {errors?.name && < div className = {classnames.error}>{errors?.name?.message}</div>}
                            </div>
                            <div className = {classnames.group}>  
                                <input 
                                type ="date"
                                {...register('dateStart', {
                                    required : 'Поле обязательно',
                                })}
                                className = {classnames.input}/>
                                {errors?.dateStart && < div className = {classnames.error}>{errors?.dateStart?.message}</div>}
                            </div>
                            <div className = {classnames.group}>
                                <input 
                                    type = "date" 
                                    {...register('dateFinish',{
                                        required : 'Поле обязательно',
                                    })}
                                    className = {classnames.input} />
                                {errors?.dateFinish && < div className = {classnames.error}>{errors?.dateFinish?.message}</div>}
                            </div>
                            <div className = {classnames.group}>
                                <input 
                                    type ="text"
                                    {...register('city', {
                                        required : 'Поле обязательно',
                                    })}
                                    className = {classnames.input} />
                                {errors?.city && <div className = {classnames.error}>{errors?.city?.message}</div>}
                            </div>
                            <textarea className={classnames.textarea} cols={43} {...register('description')} />
                        </div>
                    </div>
                    <FormFooter />
                </fieldset>}
            </form>
            </>
        )
    }

    return(
        <div className={classnames.container}>
            <TitlePage title={'Подать заявку'} />
            {!user ? 
            <h3 className={classnames.request}>Необходимо <Link to="/login">авторизоваться</Link></h3> :
            <FormStatement />
            }
        </div>
    )
}

