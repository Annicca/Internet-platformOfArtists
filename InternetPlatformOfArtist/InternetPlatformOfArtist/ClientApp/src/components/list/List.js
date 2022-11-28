import React from "react";
import { Link, NavLink } from "react-router-dom";

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

// export const NavList = ({data, classnames}) =>{
//     const NavListItem = (item) =>{
//         return(
//             <NavLink to = {item.link} className = {isActive =>
//                 classnames.link + (!isActive ? "" : " select")} end>
//                 <li className={classnames.li}>
//                     {item.title}
//                 </li>
//             </NavLink>
//         )
//     }
//     return(
//         <ul className = {classnames.ul}>
//             {data.map((item, index) =>
//                 <NavListItem{...item} key = {index} />
//         )}
//         </ul>

//     )
// }