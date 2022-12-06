import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { competitionForm} from "../../Constant";
import { Image } from "../img/Image";

import './GroupChange.scss';
import { formatdate } from "../helpers/formatdate";

export const CompetitionChange = () =>{
    const params = useParams();
    const current = params.id;

    const [competition, setCompetition] = useState();
    const [name, setName] = useState();
    const [city, setCity] = useState();
    const [start, setStart] = useState();
    const [finish, setFinish] = useState();
    const [description, setDescription] = useState();

    const apiUrl = `https://localhost:44344/api/competitions/${current}`;

    const navigate = useNavigate();

    useEffect(() => {
        const getCompetition= async() => {
            await axios.get(apiUrl).then((resp) => {
                console.log(resp.data);
                setCompetition(resp.data);
                setName(resp.data.nameCompetition);
                setDescription(resp.data.descriptionCompetition);
                setStart(formatdate(resp.data.start));
                setFinish(formatdate(resp.data.finish));
                setCity(resp.data.cityCompetition);
            }).catch((error) => console.log(error));
        }
        getCompetition();
      }, [apiUrl, setCompetition, current]); 

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = () =>{
        const competitionChange = {
            idCompetition: competition.idCompetition,
            idUser: competition.idUser,
            nameCompetition: name,
            descriptionCompetition: description,
            dateStart: start,
            dateFinish: finish,
            cityCompetition: city,
            idStatusCompetition: competition.idStatusCompetition,
            img: competition.img,
        }
        console.log(competitionChange);
        if(window.confirm('Вы действительно хотите внести изменения?')){
            axios.put(apiUrl, competitionChange).then((result) =>{
                console.log(result.data);
                alert("Успешно");
                navigate('/mycompetitions');
            }).catch((e)=>{
                alert("Мы не смогли изменить данные(")
                console.log(e.response.request._response);
            })
        }
    }

    const classnames = {
        container: 'main-container',
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
        <div className={classnames.container}>
            <form className = {classnames.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classnames.buttonContainer}>
                    <button type = "submit" className={classnames.button}>
                        <Image src = './icons/ok.svg' alt = 'Сохранить' width = {24} height = {24} />
                    </button>
                </div>
                <div className={classnames.formContainer}>
                    <div className={classnames.labels}>
                        {competitionForm.map((item,id) =>
                            <p className={classnames.label} key = {id}>{item}</p>
                        )}
                    </div>
                    {competition == undefined ? <div>Loading..</div> :
                    <div> 
                        <div className = {classnames.group}>
                            <input 
                                type = "text" 
                                {...register('name',{
                                    required : 'Поле обязательно',
                                })}
                                defaultValue = {competition.nameCompetition}
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
                            defaultValue = {start}
                            className = {classnames.input}
                            onChange = {(e) => setStart(e.target.value)} />
                            {errors?.start && < div className = {classnames.error}>{errors?.start?.message}</div>}
                        </div>
                        <div className = {classnames.group}>
                            <input 
                                type = "date" 
                                defaultValue = {finish}
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
                                defaultValue = {competition.cityCompetition}
                                className = {classnames.input}
                                placeholder = " "
                                onChange = {(e) => setCity(e.target.value)} />
                            {errors?.city && <div className = {classnames.error}>{errors?.city?.message}</div>}
                        </div>
                        <textarea className={classnames.textarea} cols={43} defaultValue = {competition.descriptionCompetition} onChange = {(e) => setDescription(e.target.value)} />
                    </div>}
                </div>

            </form>
        </div>
    )
}