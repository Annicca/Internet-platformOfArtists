import React, { useState } from "react";
import { urlSrc } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { Image } from "../img/Image";
import axios from "axios";
import { CompetitionList } from "../competition/Competition";

import './MyGroup.scss';
import { getRequestConfig } from "../helpers/getRequestConfig";

export const MyGroupList = ({groups, setState}) =>{
    return(
        <div>
            {groups == undefined ? <div>Loading...</div> : groups.map((group) =>
                <MyGroupItem group = {group} key = {group.idGroup} setState = {setState} />
            )}
        </div>
    )
}

const classnames ={
    card: 'card',
    info: 'card-info',
    title: 'card-info__title',
    child: 'card-info__article',
    text: 'card-info__text',
    edit: 'card-info__edit',
    delete: 'card-info__delete',
    competition: 'card-competition',
    linkcompetition: 'card-competition__link' ,
    img: 'card-info__img',
}
const competitionclass = {
    list: 'list-mygroup',
    competition: 'competition mycompetition',
    imgContainer: 'mycompetition-container',
    img: 'mycompetition-container-img',
    city: 'mycompetition__city',
    status: 'mycompetition__status',
    contact: 'contact mycompetition-contact',
    buttonContainer: 'mycompetition__button',
    contactImg: 'contact-img',
    name: 'mycompetition__title',
    info: 'mycompetition__info'
}

const MyGroupItem = ({group, setState}) =>{
    let navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    const deleteGroup = (idGroup)  =>{
        const url = `https://localhost:44344/api/groups/${idGroup}`;
        if(window.confirm("Вы действительно хотите удалить коллектив?")){
            axios.delete(url, getRequestConfig())
            .then((response) =>{
                setState(response.data);
                alert("Успешно");
            })
            .catch((error)=>{
                alert("Мы не смогли удалить коллектив(");
                console.log(error);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            })
        }
    };

    return(
            <section className={classnames.card}>
                <section  className={classnames.info}>
                    <article className={classnames.child}>
                        <p className={classnames.title} >{group.nameGroup}</p>
                        <Image src = {urlSrc + group.img} alt = {group.nameGroup} width = {460} height = {240} className={classnames.img} />
                    </article>
                    <article className={classnames.child}>
                        {group.category != null ?
                            <p className={classnames.text}><span>Стиль:</span>{" " + group.category}</p> :
                            <p className={classnames.text}>Стиль: -</p>
                        }
                        
                        <p className={classnames.text}><span>Адрес: </span>{"г." + group.cityGroup + ", " + group.addressGroup}</p>
                        <p className={classnames.text}>{group.descriptionGroup}</p>
                    </article> 
                    <article className={classnames.child}>
                        <button className = {classnames.edit} onClick={() => navigate(`/mygroups/change/${group.idGroup}`)} >
                            <Image src = './icons/edit.svg' alt  ='Изменить' width = {30} height ={30} />
                        </button>
                        <button className = {classnames.delete} onClick={(e) => deleteGroup(group.idGroup, e)} >
                            <Image src = './icons/delete.svg' alt  ='Удалить' width = {30} height ={30} />
                        </button>
                    </article>
                </section>
                <article className={classnames.competition}>
                        <Image src = './icons/startsmall.svg' alt = 'Конкурсы' width = {25} height = {25} />
                        {!isActive ? 
                        <p className={classnames.linkcompetition} onClick = {() =>{setIsActive(!isActive)}} >Конкурсы </p>
                        :
                        <p className={classnames.linkcompetition} onClick = {() =>{setIsActive(!isActive)}} >Скрыть конкурсы </p>
                        }
                </article>
                {!isActive ? ' ' :
                <article>
                    <CompetitionList competitions = {group.competitions}  classnames = {competitionclass} />
                </article>}
            </section>
    )
}