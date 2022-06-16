import React from "react";
import './SearchForm.css';

function SearchForm () {
    return (
        <div className="search">
            <div className="search__container">
                <form className="search__container-form" >
                    <input className="search__input" placeholder="Фильм" type="text" required></input>
                    <button className="search__button" type="submit"></button>
                </form>
                <div className="checkbox">
            <label className="checkbox__switch">
                <input className="checkbox__input" type="checkbox" />
                <span className="checkbox__slider"></span>
            </label>
            <p className="checkbox__text">Короткометражки</p>
        </div>
            </div>
        </div>
        )

}

export default SearchForm;