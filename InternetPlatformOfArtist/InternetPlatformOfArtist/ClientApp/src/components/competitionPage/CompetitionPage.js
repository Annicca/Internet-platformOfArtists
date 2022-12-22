import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Contact } from "../contact/Contact";
import { Image } from "../img/Image";
import { TakePart } from "../competition/TakePart";
import { fetchMyGroups } from "../helpers/fetchMyGroups";
import { urlSrc } from "../../Constant";

import '../groupPage/GroupPage.scss';

export const CompetitionPage= () =>{
        const params = useParams();
        const current = params.id;

        const store = require('store');
        const user = store.get('user');
        const id = user.idUser;

        const [isActivePart, setIsActivePart] = useState(false);
        const [competition, setCompetition] = useState();
        const [groups, setGroups] = useState();
        const [isDisabled, setIsDisabled] = useState(false);

        const apiUrl = `https://localhost:44344/api/competitions/${current}`;
    
        useEffect(() => {
            const getCompetition = async() => {
                await axios.get(apiUrl).then((resp) => {
                    console.log(resp.data);
                    setCompetition(resp.data);
                    if(resp.data.idStatusCompetition == 3 || resp.data.idStatusCompetition == 4){
                        setIsDisabled(true);
                    }
                }).catch((error) => {
                    console.log(error)
                }
                );
                
            }
            getCompetition();
          }, [apiUrl,setCompetition, setIsDisabled]); 

          let urlGroup = `https://localhost:44344/api/users/mygroups/${id}`;
          useEffect(() => {
            fetchMyGroups(urlGroup, setGroups);
          }, []);
    
          

          const classnames = {
            detail: 'detail',
            img: 'detail_img',
            title: 'detail_title',
            city: 'detail_style',
            description:'detail_description',
            contact: 'address_contact',
            contactImg: 'address_img',
            address: 'address',
            addressTitle: 'address_title',
            phone: 'address_phone',
            email: 'address_email',
            button: 'participant',
            status: 'detail_status',    
          }
    
        return(
            <div className = {classnames.detail}>
                {competition === undefined ? (<span>Loading...</span>) :
                    <>
                        <Image src = {urlSrc + competition.img} alt = {competition.nameCompetition} width = {780} height = {500} className = {classnames.img} />
                        <h1 className = {classnames.title}>{competition.nameCompetition}</h1>
                        <p className = {classnames.city}>{'Город: ' + competition.cityCompetition}</p>
                        { competition?.idStatusCompetition != 1 ?
                        <p className = {classnames.status}>{'Статус: ' + competition?.nameStatus}</p> :
                        <p className = {classnames.status}>Статус: Набор участников</p>
                        }
                            <div className={classnames.address}>
                                <p className={classnames.addressTitle}>Даты проведения</p>
                                <Contact contact = {competition.start + "-" + competition.finish} src = './icons/calendar.svg' alt = 'Адрес: ' width = {20} height = {21}  classnames = {classnames} />
                                
                                <p className={classnames.addressTitle}>Контакты</p>
                                {competition.organizer.phoneUser == null ? ' ' :
                                    <Contact classnames={classnames} contact = {competition.organizer.phoneUser} src = './icons/phone.svg' alt = 'Тел: '  width=  {25} height ={22} />
                                }
                                <Contact classnames={classnames} contact = {competition.organizer.mailUser} src = './icons/mail.svg' alt = 'Email: '  width=  {25} height ={20}/>
                            </div>
                            <p className={classnames.description}>{competition.descriptionCompetition}</p>
                            <button className = {classnames.button} disabled={isDisabled} onClick={(e) =>{e.preventDefault(); setIsActivePart(true);}} >Принять участие</button>
                            {groups ? 
                            <TakePart isActive={isActivePart}  setIsActive={setIsActivePart} groups={groups} idCompetition={competition.idCompetition} />
                            : ""
                            }
                    </>
                }
            </div>
        )
}