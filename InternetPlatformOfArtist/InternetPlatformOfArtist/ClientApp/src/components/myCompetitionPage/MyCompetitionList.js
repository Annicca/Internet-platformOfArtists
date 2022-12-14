import React, {useState} from "react";
import { Image } from "../img/Image";
import { useNavigate } from "react-router-dom";
import { TableParticipant } from "./TableParticipant";
import axios from "axios";
import { getRequestConfig } from "../helpers/getRequestConfig";
import { urlSrc } from "../../Constant";

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
        const cancel = await axios.put(cancelUrl + `${id}`, {}, getRequestConfig());
            console.log(cancel.data);
            setCompetitions(cancel.data);
    }

    const classnames ={
        card: 'card',
        info: 'card-info',
        title: 'card-info__title',
        img: 'card-info__img',
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
                <Image src = {urlSrc + competition.img} alt = {competition.nameCompetition} width = {460} height = {240} className={classnames.img} />
            </article>
            <article className={classnames.child}>
                <p className={classnames.text}><span>??????????:</span>{" " + competition.cityCompetition}</p>
                <p className={classnames.text}><span>???????? ????????????: </span>{" " + competition.start}</p>
                <p className={classnames.text}><span>???????? ??????????????????: </span>{" " + competition.finish}</p>
                { competition.idStatusCompetition != 1 ?
                    <p className={classnames.text}><span>????????????: </span>{" " + competition.nameStatus}</p> :
                    <p className={classnames.text}>????????????: ?????????? ????????????????????</p>
                }
                
                <p className={classnames.text}>{competition.descriptionCompetition}</p>
            </article> 
            <article className={classnames.child}>
                <button className = {classnames.edit} onClick={() => navigate(`/mycompetitions/change/${competition.idCompetition}`)} >
                    <Image src = './icons/edit.svg' alt  ='????????????????' width = {30} height ={30} />
                </button>
            </article>
        </section>
        <article className={classnames.competition}>
            <button className={classnames.cancel} onClick = {() => cancelCompetition(competition.idCompetition)} >???????????????? ??????????????</button>
                {!isActive ? 
                <p className={classnames.linkcompetition} onClick = {() =>{setIsActive(!isActive)}} >???????????????????? ???????????????????? </p>
                :
                <p className={classnames.linkcompetition} onClick = {() =>{setIsActive(!isActive)}} >???????????? ???????????????????? </p>
                }
        </article>
        {!isActive ? ' ' :
        <article className = {classnames.participant}>
            <TableParticipant participants={competition.groups} />
        </article>}
    </section>
    )
}