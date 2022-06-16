
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import NavAuth from '../NavAuth/NavAuth';
import Navigation from '../Navigation/Navigation';



const Header = () => {
    const location = useLocation();
    const isMain = location.pathname === "/";
    const headerThemeClassName = `${isMain ? "header header_type_landing" : "header header_type_main"}`;
    return (
        <header className={headerThemeClassName}>
            <Link to="/" className="header__link">
                <img className="header__logo" src={logo} alt="Логотип"></img>
            </Link>
            {location.pathname === "/" ? (
        <NavAuth/>
        ) : (
        <Navigation />
        )}
        </header>
    );
};

export default Header;