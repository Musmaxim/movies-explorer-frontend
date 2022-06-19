import React, { useState, useEffect } from "react";
import '../Navigation/Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Navigation() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const updateWindowSize = () => setWindowWidth(window.innerWidth);
    
    useEffect(() => {
        window.addEventListener("resize", updateWindowSize);
        return () => window.removeEventListener("resize", updateWindowSize);
    });

    return (
        windowWidth > 768 ? (
        <nav className="navigation">
            <button className="navigation__btn-menu" type="button"></button>
            <div className="navigation__container">
                <div className="navigation__sidebar">
                    <div className="navigation__list-container">
                        <button className="navigation__btn-close" type="button"></button>
                            <ul className="navigation__list">
                                <li className="navigation__list-item navigation__list-item_type_main">
                                    <Link to="/" className="navigation__link">Главная</Link>
                                </li>
                                <li className="navigation__list-item">
                                    <NavLink to="/movies" className="navigation__link" activeclassname="navigation__link_active">Фильмы</NavLink>
                                </li>
                                <li className="navigation__list-item">
                                    <NavLink to="/saved-movies" className="navigation__link" activeclassname="navigation__link_active">Сохранённые фильмы</NavLink>
                                </li>
                            </ul>
                    </div>
                        <Link to="/profile" className="navigation__link navigation__link_type_profile">Аккаунт</Link>
                </div>
            </div>
        </nav>
        ) : (<BurgerMenu/>)
        )}
        

        export default Navigation;