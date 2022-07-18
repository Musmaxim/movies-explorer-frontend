import React, { useState } from 'react';
import './SavedMovies.css'
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList"

function SavedMovies (props) {
    const [shortOnSaved, setShortOnSaved] = useState(false);

    return (
        <div className="saved-movies">
            <SearchForm 
                shortOnSaved={shortOnSaved}
                setShortOnSaved={setShortOnSaved}
                setSavedMovies={props.setSavedMovies}
                savedMovies={props.savedMovies}
                searchInput={props.searchInput}
                setSearchInput={props.setSearchInput}
            />
            {props.isPreloaderOpen && <Preloader />}
            <MoviesCardList 
                savedMovies={props.savedMovies}
                deleteMovie={props.deleteMovie}
                shortOnSaved={shortOnSaved}
                setSavedMovies={props.setSavedMovies}
            />
        </div>
        )
}

export default SavedMovies;