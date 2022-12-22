import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import {useNavigate } from "react-router-dom";
import { Image } from "../img/Image";
import classNames from "classnames";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";

import '../myGroupsPage/MyGroup.scss'


export const MyStatement = () =>{

    const store = require('store');
    const user = store.get('user');
    const id = user.idUser;

    let navigate = useNavigate();

    const [statements, setStatements] = useState([]);
    let url = `https://localhost:44344/api/statementes/mystatement/${id}`

    useEffect(() => {
        if(!user){
            navigate('/notfound');
        }
        const getStatement = async (url) => {
          const response = await axios.get(url, getRequestConfig());
          console.log(response.data);
          setStatements(response.data);
        };
        getStatement(url);
      }, []);

    const classnames = {
        container: 'main-container',
        request: 'request',
    }

    return(
            <div className = {classnames.container} >
                <TitlePage title={'Мои заявки'}/>
                {statements.length == 0 ? 
                <h3 className={classnames.request}>У вас ещё нет заявок</h3> : 
                statements.map((statement) =>
                    <Statement statement = {statement} key = {statement.idStatement} />
                )}
            </div>
    )
}

const Statement = ({statement}) =>{
    const classnames = {
        card: 'card',
        statement: 'mystatement',
        info: 'card-info',
        title: 'card-info__title',
        status: 'mystatement__status',
        child: 'mystatement__article',
        text: 'card-info__text'
    }
    return(
        <section className={classNames(classnames.card, classnames.statement)}>
            <section  className={classnames.info}>
                <article className={classnames.child}>
                    <p className={classnames.title} >{"Заявка № " + statement.idStatement}</p>
                    { statement.status != null ?
                    <p className={classnames.status} >{"Статус: " + statement.status}</p> :
                    <p className={classnames.status} >Статус: На рассмотрении</p>
                    }
                    <Image src = './icons/mystatement.svg' alt = {'Заявка'} width = {200} height = {200} />
                </article>
                <article className={classnames.child}>
                    <p className={classnames.text}><span>Тип:</span>{" " + statement.type}</p>
                    <p className={classnames.text}><span>Название: </span>{" " + statement.name}</p>
                    <p className={classnames.text}><span>Город: </span>{"г." + statement.city}</p>
                    {statement.address != null ? <p className={classnames.text}><span>Адрес: </span>{" " + statement.address}</p> : ''}
                    {statement.start != null ? <p className={classnames.text}><span>Дата начала: </span>{" " + statement.start.split('T')[0]}</p> : ''}
                    {statement.finish != null ? <p className={classnames.text}><span>Дата окончания: </span>{" " + statement.finish.split('T')[0]}</p> : ''}
                    <p className={classnames.text}>{statement.description}</p>
                </article> 
            </section>
        </section>
    )
}
