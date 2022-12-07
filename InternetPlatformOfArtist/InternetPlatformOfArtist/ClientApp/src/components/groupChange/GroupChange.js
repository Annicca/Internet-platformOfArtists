import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { groupForm } from "../../Constant";
import { Image } from "../img/Image";

import './GroupChange.scss';

export const GroupChange = () =>{
    const params = useParams();
    const current = params.id;
    const [group, setGroup] = useState();
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [city, setCity] = useState();
    const [address, setAddress] = useState();
    const [description, setDescription] = useState();

    const apiUrl = `https://localhost:44344/api/groups/${current}`;

    const navigate = useNavigate();

    useEffect(() => {
        const getGroup= async() => {
            await axios.get(apiUrl).then((resp) => {
                console.log(resp.data);
                setGroup(resp.data);
                setName(resp.data.nameGroup);
                setCategory(resp.data.category);
                setDescription(resp.data.descriptionGroup);
                setCity(resp.data.cityGroup);
                setAddress(resp.data.addressGroup);
            }).catch((error) => console.log(error));
        }
        getGroup();
      }, [apiUrl, setGroup, current]); 



    const onSubmit = () =>{
        const groupChange = {
            idGroup: group.idGroup,
            idUser: group.idUser,
            nameGroup: name,
            descriptionGroup: description,
            cityGroup: city,
            addressGroup: address,
            category: category,
            imgUrl: group.imgUrl,
        }
        console.log(groupChange);
        if(window.confirm('Вы действительно хотите внести изменения?')){
            axios.put(apiUrl, groupChange).then((result) =>{
                console.log(result.data);
                alert("Успешно");
                navigate('/mygroups');
            }).catch((e)=>{
                alert("Мы не смогли изменить данные(")
                console.log(e.response.request._response);
            })
        }
    }

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const classnames = {
        form: 'change',
        formContainer: 'change-container',
        group : 'change__group',
        error: 'change__error',
        input: 'change__input',
        textarea: 'change__textarea',
        labels: 'change-title',
        label : 'change-title__label',
        buttonContainer: 'change-button',
        button: 'change-button__submit',
        buttonImg: 'change-button__img'
    }

    return(
        <div className="main-container">
            <form className = {classnames.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classnames.buttonContainer}>
                    <button type = "submit" className={classnames.button}>
                        <Image src = './icons/ok.svg' alt = 'Сохранить' width = {24} height = {24} />
                    </button>
                </div>
                <div className={classnames.formContainer}>
                    <div className={classnames.labels}>
                        {groupForm.map((item,id) =>
                            <p className={classnames.label} key = {id}>{item}</p>
                        )}
                    </div>
                    {group == undefined ? <div>Loading..</div> :
                    <div> 
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                {...register('name',{
                                    required : 'Поле обязательно',
                                })}
                                defaultValue = {group.nameGroup}
                                className = {classnames.input}
                                autoFocus 
                                onChange = {(e) => setName(e.target.value)} />
                            {errors?.name && < div className = {classnames.error}>{errors?.name?.message}</div>}
                        </div>
                        <div className = {classnames.group}>  
                            <input 
                            type ="text"
                            {...register('category', {
                                required : 'Поле обязательно',
                            })}
                            defaultValue = {group.category}
                            className = {classnames.input}
                            onChange = {(e) => setCategory(e.target.value)} />
                            {errors?.category && < div className = {classnames.error}>{errors?.category?.message}</div>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                {...register('city',{
                                    required : 'Поле обязательно',
                                })}
                                defaultValue = {group.cityGroup}
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
                                defaultValue = {group.addressGroup}
                                className = {classnames.input}
                                placeholder = " "
                                onChange = {(e) => setAddress(e.target.value)} />
                            {errors?.address && <div className = {classnames.error}>{errors?.address?.message}</div>}
                        </div>
                        <textarea className={classnames.textarea} cols={43} defaultValue = {group.descriptionGroup} onChange = {(e) => setDescription(e.target.value)} />
                    </div>}
                </div>

            </form>
        </div>
    )
}