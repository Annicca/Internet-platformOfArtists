import React from "react";
import { SearchIcon } from "../../icon/SearchIcon";

import './SearchForm.scss';

export const SearchForm = ({searchText}) =>{
    const classnames = {
        formContainer: 'search',
        submit: 'search-button',
        search: 'search-button-img',
        inputSearch: 'search-input',
    }
    return(
        <form className = {classnames.formContainer}>
            <input placeholder={searchText} className = {classnames.inputSearch}/>
            <button type = "submit" className = {classnames.submit}>
            <SearchIcon className = {classnames.search}/>
            </button>
        </form>
    )
}