import React from "react";
import { Link } from "react-router-dom";

export const List = ({data, classnames}) =>{
    const ListItem = (item) =>{
        return(
            <li className={classnames.li}>
                <Link to = {item.link} className={classnames.link}>{item.title}</Link>
            </li>
        )
    }
    return(
        <ul className = {classnames.ul}>
            {data.map((item, index) =>
                <ListItem{...item} key = {index} />
        )}
        </ul>

    )
}