import React, {useState} from "react";
import { SearchIcon } from "../../icon/SearchIcon";
import { search } from "../helpers/search";

import './SearchForm.scss';

export const SearchForm = ({searchText, setValue}) =>{

    const [valueSearch, setValueSearch] = useState('');

    const classnames = {
        formContainer: 'search',
        submit: 'search-button',
        search: 'search-button-img',
        inputSearch: 'search-input',
    }


    return(
        <form className = {classnames.formContainer} >
            <input placeholder={searchText} className = {classnames.inputSearch} defaultValue = {valueSearch} onChange={(e) =>setValueSearch(e.target.value)} />
            <button type = "submit" className = {classnames.submit} onClick={(e) => search(e, setValue, valueSearch )} >
            <SearchIcon className = {classnames.search}/>
            </button>
        </form>
    )
}