import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
  return (
    <div className="movies">
      <SearchForm
        onGetMovies={props.onGetMovies}
        shortOn={props.shortOn}
        setShortOn={props.setShortOn}
        searchInput={props.searchInput}
        setSearchInput={props.setSearchInput}
      />
      {props.isPreloaderOpen && <Preloader />}
      {props.isErrorOpen && (
        <p className="movies__error">
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз.
        </p>
      )}
      {props.notFound && <p className="movies__error">Ничего не найдено.</p>}
      <MoviesCardList
        movies={props.movies}
        saveMovie={props.saveMovie}
        deleteMovie={props.deleteMovie}
        shortOn={props.shortOn}
        savedMovies={props.savedMovies}
      />
    </div>
  );
}

export default Movies;
