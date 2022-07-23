import React, { useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import findShort from "../../utils/FindShortMovie";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function MoviesCardList(props) {
  const location = useLocation();
  const allMovies = location.pathname === "/movies";
  const renderedMovies = allMovies ? props.movies : props.savedMovies;
  const isBigScreen = useMediaQuery({ query: "(min-width: 1137px)" });
  const isMediumScreen = useMediaQuery({ query: "(min-width: 634px)" });
  const bigScreenCardNumber = 12;
  const mediumScreenCardNumber = 8;
  const smallScreenCardNumber = 5;
  const bigScreenExtraCards = 3;
  const smallScreenExtraCards = 2;

  const [count, setCount] = useState(
    isBigScreen
      ? bigScreenCardNumber
      : isMediumScreen
      ? mediumScreenCardNumber
      : smallScreenCardNumber
  );

  function handleCount() {
    setCount(
      count + (isBigScreen ? bigScreenExtraCards : smallScreenExtraCards)
    );
  }

  return (
    <div className="card-list">
      <section className="card-list__container">
        {((allMovies ? props.shortOn : props.shortOnSaved)
          ? findShort(renderedMovies)
          : renderedMovies
        ).map(
          (movie, i) =>
            i < (allMovies ? count : props.savedMovies.length) && (
              <MoviesCard
                movie={movie}
                key={allMovies ? movie.id : movie.movieId}
                saveMovie={props.saveMovie}
                deleteMovie={props.deleteMovie}
                savedMovies={props.savedMovies}
                setSavedMovies={props.setSavedMovies}
              />
            )
        )}
      </section>
      {allMovies &&
      count <
        (props.shortOn ? findShort(renderedMovies) : renderedMovies.length) ? (
        <div className="card-list__more">
          <button
            className="card-list__more-button"
            type="button"
            aria-label="Ещё"
            onClick={handleCount}
          ></button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MoviesCardList;
