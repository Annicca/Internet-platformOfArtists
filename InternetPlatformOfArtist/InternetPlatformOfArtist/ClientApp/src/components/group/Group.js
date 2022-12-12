import React from "react";
import { Link } from "react-router-dom";
import { Contact } from "../contact/Contact";
import { Image } from "../img/Image";

export const Group = ({group}) =>{
    const classnames = {
        group: 'item',
        imgContainer: 'item-container',
        img: 'item-container-img',
        info: 'item-info',
        nameGroup: 'item-info-title',
        address: 'item-info-address',
        addressText: 'item-info-address-text',
        contact: 'item-info-contact',
        contactImg: 'item-info-contact-img',
        red: 'item-info-title-red'
    }

    const ContactChose = ({phoneUser, mailUser}) =>{
        if(group.director.phoneUser != null){
            return(
                <Contact classnames={classnames} contact = {phoneUser} src = './icons/phone.svg' alt = 'Тел: ' />
            )}
        else{
            return(
                <Contact classnames={classnames} contact = {mailUser} src = './icons/mail.svg' alt = 'Email: ' />
            )
        }
    }

    return(
        <div className={classnames.group}>
            <div className={classnames.imgContainer}>
                <Image src= {group.img} alt = ' Нет фото' width = {189} height = {121} className = {classnames.img} />
            </div>
            <div className={classnames.info}>
                <div className={classnames.nameGroup}>
                    <p>{group.nameGroup}</p>
                    {group.category != null ? 
                    <p className = {classnames.red}>{'Стиль: ' + group.category}</p> :
                    <p className = {classnames.red}>Стиль: -</p>
                    }
                </div>
                <div className = {classnames.address}>
                    <Image src = './icons/group.svg' alt = 'Адрес: ' />
                    <div className={classnames.addressText}>
                        <p>{group.cityGroup}</p>
                        <p>{group.addressGroup}</p>
                    </div>
                </div>
                <ContactChose phoneUser={group.director.phoneUser} mailUser = {group.director.mailUser} />
            </div>
        </div>
    )
}

export const GroupList = ({groups, classnames}) =>{
    return(
        <div className = {classnames.groupList}>
        {groups == undefined ? <div>Loading...</div> : groups.map((group) =>
            <Link to = {`/${group.idGroup}`} key = {group.idGroup} > <Group group = {group} /></Link>
        )
        } 
      </div>
    )
}