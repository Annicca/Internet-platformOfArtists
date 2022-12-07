import React from "react";
import { Image } from "../img/Image";

import './FileInput.scss';

export const FileInput = ({fileContainerClass}) =>{
    const classnames = {
        
        fileTitle: 'file-container__title',
        inputFile: 'file-container__input',
        labelFile: 'file-container__label',
        textlabel: 'file-container__text',
        buttonfile: 'file-container__button'
    }

    return(
        <div className={fileContainerClass}>
            <p className={classnames.fileTitle}>Выберете фото:</p>
            <input type="file" name = "img" id = "imginput" accept = "image/jpeg,image/png" className={classnames.inputFile} />
            <label class="" for="imginput" className={classnames.labelFile}>
                <div class={classnames.buttonfile}>
                    <Image src = './icons/imagedown.svg' alt = 'Загрузить' />
                </div>
                <div class={classnames.textlabel}>Файл не выбран</div>
            </label>
        </div>
    )
}