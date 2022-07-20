import React, { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setIsValid(e.target.closest("form").checkValidity());
    setErrors({ ...errors, [name]: target.validationMessage });
  }

  const isNotChange = Boolean(
    currentUser.email === values.email || currentUser.name === values.name
  );

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      email: values.email,
      name: values.name,
    });
  }

  return (
    <div className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>

        <div className="profile__input-container">
          <label className="profile__input-container-label">Имя</label>
          <input
            id="profile-input-name"
            type="text"
            name="name"
            onChange={handleChange}
            defaultValue={currentUser.name}
            className="profile__item-input profile__item-input_type_name"
            required
            minLength="2"
            maxLength="30"
          />
        </div>
        <p className="form__input-error">{errors.name}</p>

        <div className="profile__input-container">
          <label className="profile__input-container-label">E-mail</label>
          <input
            id="profile-input-email"
            type="email"
            name="email"
            onChange={handleChange}
            defaultValue={currentUser.email}
            className="profile__item-input"
            required
          />
        </div>
        <p className="form__input-error">{errors.email}</p>

        <div className="profile__link-container">
          <button
            className={`profile__button ${
              isValid && !isNotChange ? "" : "profile__button_inactive"
            }`}
            disabled={!isValid || isNotChange}
          >
            Редактировать
          </button>
          <button
            className="profile__link"
            type="button"
            onClick={props.signOut}
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
