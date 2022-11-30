import React from "react";
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
                <Image src= {group.imgUrl} alt = ' Нет фото' width = {189} height = {121} className = {classnames.img} />
            </div>
            <div className={classnames.info}>
                <div className={classnames.nameGroup}>
                    <p>{group.nameGroup}</p>
                    <p className = {classnames.red}>{'Стиль: ' + group.category}</p>
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