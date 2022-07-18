import "../Body/Body.css";
import "./App.css";
import "../../index.css";
import React, { useState, useEffect } from "react";
import {
    Route,
    Switch,
    Redirect,
    useLocation,
    useHistory,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import getInitialMovies from "../Utils/MoviesApi";
import mainApi from "../Utils/MainApi";
import findMovie from "../Utils/FindMovie";
import ProtectedRoute from "../Utils/ProtectedRoute";
import * as auth from "../Utils/auth.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [shortOn, setShortOn] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
);
    const [currentUser, setCurrentUser] = useState({});
    const [searchInput, setSearchInput] = useState(
    localStorage.getItem('input') || ""
);
    const history = useHistory();

useEffect(() => {
    if (loggedIn) {
        mainApi
        .getUser()
        .then((data) => {
            setCurrentUser(data.user);
        })
        .catch((err) => console.log(err));
    }
}, []);

function handleGetUser() {
    mainApi
        .getUser()
        .then((data) => {
        setCurrentUser(data.user);
    })
        .catch((err) => console.log(err));
}

function handleUpdateUser({ email, name }) {
    mainApi
        .updateUserInfo({ email, name })
        .then((user) => {
        setCurrentUser(user);
        })
    .catch((err) => console.log(err));
}

useEffect(() => {
    setMovies(JSON.parse(localStorage.getItem('movies')) || movies);
    setShortOn(JSON.parse(localStorage.getItem('short')) || false);
}, []);

function handleGetAllMovies(name) {
    setIsPreloaderOpen(true);
    setNotFound(false);
    getInitialMovies()
        .then((movies) => {
        let filteredMovies = findMovie(movies, name);
        setMovies(filteredMovies);
        filteredMovies.length === 0 && setNotFound(true);
        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        localStorage.setItem('input', name);
    })
        .catch((err) => {
        console.log(err);
        setIsErrorOpen(true);
    })
        .finally(() => setIsPreloaderOpen(false));
}

useEffect(() => {
    if (loggedIn) {
        mainApi
        .getMovies()
        .then((savedMovies) => {
            const currentUserMovies = savedMovies.filter(
            (movie) => movie.owner === currentUser._id
        );
            localStorage.setItem(
            'savedMovies',
            JSON.stringify(currentUserMovies)
        );
            setSavedMovies(currentUserMovies);
        })
        .catch((err) => console.log(err));
    }
}, [currentUser._id]);

function handleSaveMovie(movie) {
    mainApi
        .addMovie({
        movieId: movie.id,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    })
        .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
    })
        .catch((err) => console.log(err));
}

function handleDeleteMovie(deletedMovie) {
    mainApi
        .deleteMovie(deletedMovie._id)
        .then(() => {
        setSavedMovies((movies) =>
            movies.filter((movie) => movie._id !== deletedMovie._id)
        );
        console.log("Карточка удалена");
    })
        .catch((err) => console.log(err));
}

function registration(name, email, password) {
    auth
        .register(name, email, password)
        .then(() => authorization(email, password))
        .catch((err) => console.log(err));
}

function authorization(email, password) {
    auth
        .authorize(email, password)
        .then((data) => {
        if (data.token) {
            setLoggedIn(true);
            localStorage.setItem('token', data.token);
            history.push("/movies");
            handleGetUser();
        }
    })
        .catch((err) => console.log(err));
}

function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('input');
    localStorage.removeItem('movies');
    localStorage.removeItem('short');
    setLoggedIn(false);
    history.push("/");
    setSearchInput("");
    setMovies([]);
}

let location = useLocation();

const isHeaderVisible = () => {
    const locations = ["/", "/saved-movies", "/movies", "/profile"];
    return locations.includes(location.pathname);
};

const isFooterVisible = () => {
    const locations = ["/", "/saved-movies", "/movies"];
    return locations.includes(location.pathname);
};

    return (
    <>
        <CurrentUserContext.Provider value={currentUser}>
        <div className="Body">
            <div className="App">
            {isHeaderVisible() && <Header loggedIn={loggedIn} />}
            <Switch>
                <Route exact path="/">
                <Main />
                </Route>
                <ProtectedRoute
                path="/movies"
                loggedIn={loggedIn}
                component={Movies}
                onGetMovies={handleGetAllMovies}
                movies={movies}
                isPreloaderOpen={isPreloaderOpen}
                isErrorOpen={isErrorOpen}
                shortOn={shortOn}
                setShortOn={setShortOn}
                notFound={notFound}
                saveMovie={handleSaveMovie}
                deleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                />

                <ProtectedRoute
                path="/saved-movies"
                component={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                isPreloaderOpen={isPreloaderOpen}
                isErrorOpen={isErrorOpen}
                deleteMovie={handleDeleteMovie}
                shortOn={shortOn}
                setShortOn={setShortOn}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                />

                <ProtectedRoute
                path="/profile"
                component={Profile}
                loggedIn={loggedIn}
                signOut={signOut}
                onUpdateUser={handleUpdateUser}
                />

                <Route path="/signup">
                {loggedIn ? (
                    <Redirect to="/" />
                ) : (
                    <Register registration={registration} />
                )}
                </Route>

                <Route path="/signin">
                {loggedIn ? (
                    <Redirect to="/" />
                ) : (
                    <Login authorization={authorization} />
                )}
                </Route>

                <Route path="*">
                <ErrorScreen />
                </Route>
            </Switch>
            {isFooterVisible() && <Footer />}
            </div>
        </div>
        </CurrentUserContext.Provider>
    </>
    );
}

export default App;
