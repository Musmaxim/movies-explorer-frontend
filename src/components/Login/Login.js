import React, { useState } from "react";
import './Login.css';
import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom';

function Login (props) {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setValues({...values, [name]: value});
        setIsValid(e.target.closest('form').checkValidity());
        setErrors({...errors, [name]: target.validationMessage });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.authorization(values.email, values.password)
    }

    return (
        <div className="login">
            <Link to='/'> <img src={logo} alt="Логотип" className="form__logo" /> </Link>
                <h1 className="form__title-login">Рады видеть!</h1>
            <form onSubmit={handleSubmit} className="form">
                    <p className="form__item-text">E-mail</p>
                        <input
                        className="form__item-input"
                        type="email" 
                        value={values.email || ''} 
                        onChange={handleChange} pattern="\w+[@][a-zA-Z]+\.[a-zA-Z]+" id="email-input" name="email" required minLength="2" maxLength="30"
                        />
                        <p className="form__input-error">{errors.email}</p>
                    <p className="form__item-text">Пароль</p>
                        <input 
                        className="form__item-input" 
                        type="password" 
                        value={values.password || ''} 
                        onChange={handleChange} id="password-input" name="password" required minLength="8"
                        />
                        <p className="form__input-error">{errors.password}</p>
                <button   className={`form__button ${!isValid && 'form__button_inactive'}`} type="submit" disabled={!isValid}>"Зарегистрироваться"</button>
            <div className="form__link-container">
                <p className="form__link-text">Еще не зарегистрированы?</p>
                <Link className="form__link" to="/signup">Регистрация</Link>
            </div>
            </form>
        </div>
        )
}

export default Login;