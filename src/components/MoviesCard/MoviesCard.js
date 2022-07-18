import React, {useState, useEffect} from 'react';
import './MoviesCard.css'
import { useLocation } from "react-router-dom";
import NotSaved from '../../images/notsaved.svg';
import Saved from '../../images/saved.svg';
import Delete from '../../images/delete.svg';

function MoviesCard (props) {

    const location = useLocation();
    const [isLiked, setIsLiked] = useState(false);
    const savedMoviesId = props.savedMovies.map(saveMovie => saveMovie.movieId);
    
    useEffect(() => {
        savedMoviesId.includes(props.movie.id) && setIsLiked(true)
    }, [props.savedMovies]);

    function handleLikeCard() {
        setIsLiked(!isLiked)
        !isLiked
        ? props.saveMovie(props.movie)
        : props.deleteMovie(props.savedMovies[savedMoviesId.findIndex(saveMovieId => saveMovieId === props.movie.id)])
    }
    
    function handleDeleteCard() {
        props.deleteMovie(props.movie)
    }
    
    function calculateDuration(duration) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return (hours ? `${hours}ч ` : '') + (minutes ? `${minutes}м` : '')
    }

    return (
        <div className="card">
            <div className="card__text-container">
                <p className="card__text">{props.movie.nameRU}</p>
            </div>
            <p className="card__time">{calculateDuration(props.movie.duration)}</p>
            <a className="card__pic" href={props.movie.trailerLink} target="_blank">
                <img className="card__pic" src={location.pathname === '/movies' ? `https://api.nomoreparties.co${props.movie.image.url}` : props.movie.image} alt="Скриншот фильма"></img>
            </a>
                <button 
                className="card__button"
                onClick={location.pathname === '/movies' ? handleLikeCard : handleDeleteCard}  
                type='button'
                style={{
                    backgroundImage: `url(${location.pathname === '/movies' 
                    ? `${isLiked ? Saved : NotSaved}` 
                    : Delete})`
                }}/>
        </div>
        )
}

export default MoviesCard;