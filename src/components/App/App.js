import '../Body/Body.css';
import './App.css';
import "../../index.css";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";

function App() {
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
            <div className="Body">
            <div className="App">
            {isHeaderVisible() && <Header />}
                <Routes>
                    <Route exact path="/" element={<Main />} />
                    <Route path="/movies" element={<Movies />}/>
                    <Route path="/saved-movies" element={<SavedMovies />}/>
                    <Route path="/signup" element={<Register />}/>
                    <Route path="/signin" element={<Login />}/>
                    <Route path="/profile" element={<Profile />}/>
                    <Route path="/error" element={<ErrorScreen />}/>
                </Routes>
                {isFooterVisible() && <Footer />}
            </div>
            </div>
        </>
    )};

    export default App;