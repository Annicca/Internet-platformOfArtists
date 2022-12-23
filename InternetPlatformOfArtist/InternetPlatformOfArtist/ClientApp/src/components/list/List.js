import React from "react";
import { Link} from "react-router-dom";

export const List = ({data, classnames}) =>{
    const ListItem = (item) =>{
        return(
            <Link to = {item.link} className={classnames.link}>
                <li className={classnames.li}>
                    {item.title}
                </li>
            </Link>
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
