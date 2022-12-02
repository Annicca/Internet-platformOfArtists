import React from "react";
import { NotFoundIcon } from "../../icon/NotFoundIcon";

import '../authorize/Registration.scss';

export const NotFound = () =>{

    return(
        <div className='container-auth' >
            <NotFoundIcon className = 'notfound' />
        </div>
    )

}