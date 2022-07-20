import React from "react";
import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register(props) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValid(e.target.closest("form").checkValidity());
    setErrors({ ...errors, [name]: target.validationMessage });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.registration(values.name, values.email, values.password);
  }

  return (
    <div className="register">
      <Link to="/">
        {" "}
        <img src={logo} alt="Логотип" className="form__logo" />{" "}
      </Link>
      <h1 className="form__title-register">Добро пожаловать!</h1>
      <form onSubmit={handleSubmit} className="form">
        <p className="form__item-text">Имя</p>
        <input
          className="form__item-input"
          type="text"
          value={values.name || ""}
          onChange={handleChange}
          id="name-input"
          name="name"
          required
          minLength="8"
          maxLength="30"
        />
        <p className="form__input-error">{errors.name}</p>
        <p className="form__item-text">E-mail</p>
        <input
          className="form__item-input"
          type="email"
          value={values.email || ""}
          onChange={handleChange}
          pattern="\w+[@][a-zA-Z]+\.[a-zA-Z]+"
          id="email-input"
          name="email"
          required
          minLength="2"
          maxLength="30"
        />
        <p className="form__input-error">{errors.email}</p>
        <p className="form__item-text">Пароль</p>
        <input
          className="form__item-input"
          type="password"
          value={values.password || ""}
          onChange={handleChange}
          id="password-input"
          name="password"
          required
          minLength="8"
        />
        <p className="form__input-error">{errors.password}</p>
        <button
          className={`form__button ${!isValid && "form__button_inactive"}`}
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <div className="form__link-container">
          <p className="form__link-text">Уже зарегистрированы?</p>
          <Link className="form__link" to="/signin">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
