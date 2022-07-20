import React, { useState } from "react";
import "./SearchForm.css";
import { useLocation } from "react-router-dom";
import findMovie from "../../utils/FindMovie";

function SearchForm(props) {
  const locationMovies = useLocation().pathname === "/movies";
  const [searchInputSaved, setSearchInputSaved] = useState("");

  const handleChangeName = (e) => {
    locationMovies
      ? props.setSearchInput(e.target.value)
      : setSearchInputSaved(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    locationMovies
      ? props.onGetMovies(props.searchInput)
      : props.setSavedMovies(
          findMovie(
            JSON.parse(localStorage.getItem("savedMovies")),
            searchInputSaved
          )
        );
  };

  const handleShortOn = (e) => {
    if (locationMovies) {
      props.setShortOn(!props.shortOn);
      localStorage.setItem("short", !props.shortOn);
    } else {
      props.setShortOnSaved(!props.shortOnSaved);
    }
  };

  return (
    <div className="search">
      <div className="search__container">
        <form className="search__container-form" onSubmit={handleSubmit}>
          <input
            className="search__input"
            placeholder="Фильм"
            type="search"
            value={
              (locationMovies ? props.searchInput : searchInputSaved) || ""
            }
            onChange={handleChangeName}
            required
            id="movie-input"
            name="movie"
          ></input>
          <button className="search__button" type="submit"></button>
        </form>
        <div className="checkbox">
          <label className="checkbox__switch">
            <input
              className="checkbox__input"
              type="checkbox"
              onChange={handleShortOn}
              checked={locationMovies ? props.shortOn : props.shortOnSaved}
            />
            <span className="checkbox__slider"></span>
          </label>
          <p className="checkbox__text">Короткометражки</p>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
