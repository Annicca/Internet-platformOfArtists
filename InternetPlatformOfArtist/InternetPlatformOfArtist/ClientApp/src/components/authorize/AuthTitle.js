import React from "react";
import { Link} from "react-router-dom";

export const AuthTitle = ({classnames,title, path, linkText}) =>{
    return(
        <div className={classnames.title}>
            <h2>{title}</h2>
            <p>
                <Link to = {path} className={classnames.link}>{linkText}</Link>
            </p>
        </div>
    )
}