import React from "react";
import './MoviesCardList.css'
import MoviesCard from "../MoviesCard/MoviesCard";
import ButtonMore from "../ButtonMore/ButtonMore";
import { useLocation } from "react-router-dom";

function MoviesCardList () {

    let location = useLocation();
    const isSaved = location.pathname === "/saved-movies";

    return (
        <div className="card-list">
        <div className="card-list__container">
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
            <MoviesCard />
        </div>
        {isSaved ? '' : <ButtonMore />}
        </div>
        )
}

export default MoviesCardList;