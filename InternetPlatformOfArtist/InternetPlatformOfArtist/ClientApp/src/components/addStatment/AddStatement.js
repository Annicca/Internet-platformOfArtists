import React, {useState} from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import {Image} from "../img/Image";
import { useForm } from "react-hook-form";
import { statementGroup, competitionForm } from "../../Constant";
import classNames from "classnames";

import './AddStatement.scss';
import { FileInput } from "../fileInput/FileInput";

export const AddStatement = () =>{

    const store = require('store');
    const user = store.get('user');
    const id = user.idUser;

    const [isActive, setIsActive] = useState(false);
    const [type, setType] = useState();
    const[isDisabled, setDisabled] = useState(true);

    const [name, setName] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState(null);
    const [description, setDescription] = useState();
    const [start, setStart] = useState(null);
    const [finish, setFinish] = useState(null);
    const [img, setImg] = useState(null);

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = () =>{
        let statement = {
            idUser: id,
            idType: type,
            name: name,
            description: description,
            city: city,
            address: address,
            dateStart: start,
            dateFinish: finish,
        }
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

        formContainer: 'change-container change-container_margin',
        group : 'change__group',
        error: 'change__error',
        input: 'change__input',
        textarea: 'change__textarea',
        labels: 'change-title',
        label : 'change-title__label',

        file: 'file-container',
    }

    return(
        <div className={classnames.container}>
            <TitlePage title={'Подать заявку'} />

            <form className={classnames.form} onSubmit={handleSubmit(onSubmit)}>
                <fieldset className = {classNames(classnames.open, { 'field-active': !isActive})}>
                    <legend className={classnames.title}>
                        1. Выберете, что хотите разместить
                    </legend>
                    <div className={classnames.radioContainer}>
                        <label htmlFor="radioGroup">
                            <input className = {classnames.radio} type="radio" name="idType" value ="1" id="radioGroup" onChange={(e) => {setType(e.target.value); setDisabled(false)}}/>
                            <span>Коллектив</span>
                        </label>
                        <label htmlFor="radioCompetition">
                            <input className = {classnames.radio} type="radio" name="idType" value ="2" id = "radioCompetition" onChange={(e) => {setType(e.target.value); setDisabled(false)}} />
                            <span>Конкурс</span>
                        </label>
                        <div className={classnames.buttonContainer} >
                            <button className={classnames.button} disabled = {isDisabled} onClick={(e) => {e.preventDefault(); setIsActive(!isActive)}} >
                                <Image src = './icons/then.svg' alt="Далее" width = {20} height = {20} />
                            </button>
                        </div>
                    </div>
                </fieldset>
                <fieldset  className = {classNames(classnames.open, { 'field-active': isActive && type == 1 })} >
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
                                    autoFocus 
                                    onChange = {(e) => setName(e.target.value)} />
                                {errors?.name && < div className = {classnames.error}>{errors?.name?.message}</div>}
                            </div>
                            <div className = {classnames.group}>
                                <input 
                                    type = "text" 
                                    {...register('city',{
                                        required : 'Поле обязательно',
                                    })}
                                    className = {classnames.input}
                                    onChange = {(e) => setCity(e.target.value)} />
                                {errors?.city && < div className = {classnames.error}>{errors?.city?.message}</div>}
                            </div>
                            <div className = {classnames.group}>
                                <input 
                                    type ="text"
                                    {...register('address', {
                                        required : 'Поле обязательно',
                                    })}
                                    className = {classnames.input}
                                    placeholder = " "
                                    onChange = {(e) => setAddress(e.target.value)} />
                                {errors?.address && <div className = {classnames.error}>{errors?.address?.message}</div>}
                            </div>
                            <textarea className={classnames.textarea} cols={43} onChange = {(e) => setDescription(e.target.value)} />
                            <FileInput fileContainerClass={classnames.file} />
                        </div>
                        
                    </div>
                    <div className={classNames(classnames.buttonContainer, classnames.submitContainer)}>
                        <button className={classnames.button} onClick={(e) => {e.preventDefault(); setIsActive(!isActive)}} >
                            <Image src = './icons/leftarrow.svg' alt="Далее" width = {20} height = {20} />
                        </button>
                        <button type = "submit" className={classnames.submit}>Подать заявку</button>
                    </div>
                </fieldset>
                <fieldset  className = {classNames(classnames.open, { 'field-active': isActive && type == 2 })} >
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
                                    {...register('name',{
                                        required : 'Поле обязательно',
                                    })}
                                    className = {classnames.input}
                                    autoFocus 
                                    onChange = {(e) => setName(e.target.value)} />
                                {errors?.name && < div className = {classnames.error}>{errors?.name?.message}</div>}
                            </div>
                            <div className = {classnames.group}>  
                                <input 
                                type ="date"
                                {...register('start', {
                                    required : 'Поле обязательно',
                                })}
                                className = {classnames.input}
                                onChange = {(e) => setStart(e.target.value)} />
                                {errors?.start && < div className = {classnames.error}>{errors?.start?.message}</div>}
                            </div>
                            <div className = {classnames.group}>
                                <input 
                                    type = "date" 
                                    {...register('finish',{
                                        required : 'Поле обязательно',
                                    })}
                                
                                    className = {classnames.input}
                                    onChange = {(e) => setFinish(e.target.value)} />
                                {errors?.finish && < div className = {classnames.error}>{errors?.finish?.message}</div>}
                            </div>
                            <div className = {classnames.group}>
                                <input 
                                    type ="text"
                                    {...register('city', {
                                        required : 'Поле обязательно',
                                    })}
                                    className = {classnames.input}
                                    placeholder = " "
                                    onChange = {(e) => setCity(e.target.value)} />
                                {errors?.city && <div className = {classnames.error}>{errors?.city?.message}</div>}
                            </div>
                            <textarea className={classnames.textarea} cols={43} onChange = {(e) => setDescription(e.target.value)} />
                            <FileInput fileContainerClass={classnames.file} />
                        </div>
                    </div>
                    <div className={classNames(classnames.buttonContainer, classnames.submitContainer)}>
                        <button className={classnames.button} onClick={(e) => {e.preventDefault(); setIsActive(!isActive)}} >
                            <Image src = './icons/leftarrow.svg' alt="Далее" width = {20} height = {20} />
                        </button>
                        <button type = "submit" className={classnames.submit}>Подать заявку</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}