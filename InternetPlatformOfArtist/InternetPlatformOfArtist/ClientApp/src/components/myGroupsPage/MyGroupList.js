import React from "react";
import { Link } from "react-router-dom";
import { Image } from "../img/Image";
import './MyGroup.scss';

export const MyGroupList = ({groups}) =>{
    return(
        <div>
            {groups == undefined ? <div>Loading...</div> : groups.map((group) =>
                <MyGroupItem group = {group} />
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
    linkcompetition: 'card-competition__link'
}

const MyGroupItem = ({group}) =>{
    return(
            <section className={classnames.card}>
                <section  className={classnames.info}>
                    <article className={classnames.child}>
                        <p className={classnames.title} >{group.nameGroup}</p>
                        <Image src = {group.img} alt = {group.nameGroup} width = {460} height = {240} />
                        {/* <button>Изменить фото</button> */}
                    </article>
                    <article className={classnames.child}>
                        <p className={classnames.text}><span>Стиль:</span>{" " + group.category}</p>
                        <p className={classnames.text}><span>Адрес: </span>{"г." + group.cityGroup + ", " + group.addressGroup}</p>
                        <p className={classnames.text}>{group.descriptionGroup}</p>
                    </article> 
                    <article className={classnames.child}>
                        <button className = {classnames.edit} >
                            <Image src = './icons/edit.svg' alt  ='Изменить' width = {30} height ={30} />
                        </button>
                        <button className = {classnames.delete} >
                            <Image src = './icons/delete.svg' alt  ='Удалить' width = {30} height ={30} />
                        </button>
                    </article>
                </section>
                <article className={classnames.competition}>
                        <Image src = './icons/startsmall.svg' alt = 'Конкурсы' width = {25} height = {25} />
                        <Link to = '' className={classnames.linkcompetition}>Конкурсы {"->"}</Link>
                </article>
            </section>
    )
}