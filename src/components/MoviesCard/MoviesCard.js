import React from "react";
import './MoviesCard.css'
import card from "../../images/movie-picture.png"
import { useLocation } from "react-router-dom";

function MoviesCard () {

    let location = useLocation();
    const isSaved = location.pathname === "/saved-movies";

    const headerThemeClassName = `${isSaved ? "card__button_type_delete" : " card__button"}`;

    return (
        <div className="card">
            <div className="card__text-container">
                <p className="card__text">В погоне за Бэнкси</p>
            </div>
            <p className="card__time">27м</p>
            <img className="card__pic" src={card} alt="В погоне за Бэнкси"></img>
            
                <button className={headerThemeClassName}  type='button'/>
        </div>
        )
}

export default MoviesCard;