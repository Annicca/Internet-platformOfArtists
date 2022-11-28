import React from "react";
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
        contactPhone: 'item-info-contact-phone',
        red: 'item-info-title-red'
    }

    const Contact = () =>{
        if(group.director.phoneUser != null){
            return(
                <p>
                    <span >
                        <Image src = './icons/phone.svg' alt = 'Тел: ' className = {classnames.contactPhone} />
                    </span>
                        <span>{group.director.phoneUser}</span>
                </p>
            )}
        else{
            return(
                <p>
                    <span >
                        <Image src = './icons/mail.svg' alt = 'Email: ' className = {classnames.contactPhone} />
                    </span>
                        <span>{group.director.mailUser}</span>
                </p>
            )
        }
    }

    //'./icons/groupsphoto/zvony.jpg'

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
                <div className={classnames.contact}>
                    <Contact />
                </div>
            </div>
        </div>
    )
}