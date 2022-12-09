import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TitlePage } from "../TitlePage/TitlPage";
import { Link } from "react-router-dom";
import { Image } from "../img/Image";
import classNames from "classnames";

import '../myGroupsPage/MyGroup.scss'

export const MyStatement = () =>{

    const store = require('store');
    const user = store.get('user');
    const id = user.idUser;

    const [statements, setStatements] = useState();
    let url = `https://localhost:44344/api/statementes/mystatement/${id}`

    useEffect(() => {
        const dataFetch = async (url) => {
          const data = await (
            await fetch(url)).json();
            console.log(data.results);
          setStatements(data.results);
        };
        dataFetch(url);
      }, [setStatements, url]);

    const classnames = {
        container: 'main-container',
        request: 'request',
    }

    if(id === undefined){
        return(
            <div className={classnames.container}>
                <h3 className={classnames.request}>
                    Чтобы посмотреть свои коллективы необходимо <Link  to = '/login'>авторизоваться</Link> 
                </h3>
            </div>
        )
    } else if(statements == []){
        <div className={classnames.container}>
            <h3 className={classnames.request}>У вас ещё нет коллективов</h3>
        </div>
    } else{
        return(
            <div className = {classnames.container} >
                <TitlePage title={'Мои заявки'}/>
                {statements == undefined ? <p>Loading...</p> : statements.map((statement) =>
                    <Statement statement = {statement} key = {statement.idStatement} />
                )}
            </div>
        )
    }
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
                    <p className={classnames.status} >{"Статус: " + statement.status}</p>
                    <Image src = './icons/mystatement.svg' alt = {'Заявка'} width = {200} height = {200} />
                </article>
                <article className={classnames.child}>
                    <p className={classnames.text}><span>Тип:</span>{" " + statement.type}</p>
                    <p className={classnames.text}><span>Название: </span>{" " + statement.name}</p>
                    <p className={classnames.text}><span>Город: </span>{"г." + statement.city}</p>
                    {statement.address != null ? <p className={classnames.text}><span>Адрес: </span>{" " + statement.address}</p> : ''}
                    {statement.start != null ? <p className={classnames.text}><span>Дата нчала: </span>{" " + statement.start}</p> : ''}
                    {statement.finish != null ? <p className={classnames.text}><span>Дата окончания: </span>{" " + statement.finish}</p> : ''}
                    <p className={classnames.text}>{statement.description}</p>
                </article> 
            </section>
        </section>
    )
}
