import React from "react";
import { NotFoundIcon } from "../../icon/NotFoundIcon";

export const NotFound = () =>{
    const css = require('../authorize/Registration.scss').toString();

    return(
        <main>
            <NotFoundIcon className = 'notfound' />
        </main>
    )

}