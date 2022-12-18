import React, {useState} from "react";
import { Image } from "../img/Image";
import { useNavigate } from "react-router-dom";
import { TableParticipant } from "./TableParticipant";

export const MyCompetitionList = ({competitions, setCompetitions}) =>{
    return(
        <div>
        {competitions == undefined ? <div>Loading...</div> : competitions.map((competition) =>
            <MyCompetitionItem competition = {competition} key = {competition.idCompetition} setCompetitions = {setCompetitions} />
        )}
    </div>
    )
}

const MyCompetitionItem = ({competition, setCompetitions}) =>{

    let navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    let cancelUrl = `https://localhost:44344/api/competitions/cancel/`;

    const cancelCompetition = async(id) =>{
        const cancel = await(
            await fetch(cancelUrl + `${id}`)).json();
            console.log(cancel);
            setCompetitions(cancel.results);
    }

    const classnames ={
        card: 'card',
        info: 'card-info',
        title: 'card-info__title',
        child: 'card-info__article',
        text: 'card-info__text',
        edit: 'card-info__edit',
        delete: 'card-info__delete',
        competition: 'card__participant',
        linkcompetition: 'card-competition__link' ,
        cancel: 'card__cancel',
        participant: 'card__list'
    }

    return(
        <section className={classnames.card}>
        <section  className={classnames.info}>
            <article className={classnames.child}>
                <p className={classnames.title} >{competition.nameCompetition}</p>
                <Image src = {competition.img} alt = {competition.nameCompetition} width = {460} height = {240} />
                {/* <button>Изменить фото</button> */}
            </article>
            <article className={classnames.child}>
                <p className={classnames.text}><span>Город:</span>{" " + competition.cityCompetition}</p>
                <p className={classnames.text}><span>Дата начала: </span>{" " + competition.start}</p>
                <p className={classnames.text}><span>Дата окончания: </span>{" " + competition.finish}</p>
                { competition.idStatusCompetition != 1 ?
                    <p className={classnames.text}><span>Статус: </span>{" " + competition.nameStatus}</p> :
                    <p className={classnames.text}>Статус: Набор участников</p>
                }
                
                <p className={classnames.text}>{competition.descriptionCompetition}</p>
            </article> 
            <article className={classnames.child}>
                <button className = {classnames.edit} onClick={() => navigate(`/mycompetitions/change/${competition.idCompetition}`)} >
                    <Image src = './icons/edit.svg' alt  ='Изменить' width = {30} height ={30} />
                </button>
            </article>
        </section>
        <article className={classnames.competition}>
            <button className={classnames.cancel} onClick = {() => cancelCompetition(competition.idCompetition)} >Отменить конкурс</button>
                {!isActive ? 
                <p className={classnames.linkcompetition} onClick = {() =>{setIsActive(!isActive)}} >Посмотреть участников </p>
                :
                <p className={classnames.linkcompetition} onClick = {() =>{setIsActive(!isActive)}} >Скрыть участников </p>
                }
        </article>
        {!isActive ? ' ' :
        <article className = {classnames.participant}>
            <TableParticipant participants={competition.groups} />
        </article>}
    </section>
    )
}