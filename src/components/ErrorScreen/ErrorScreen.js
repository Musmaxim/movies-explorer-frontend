import "./ErrorScreen.css";

function ErrorScreen() {
  function goBack() {
    return window.history.back(-1);
  }

  return (
    <div className="error-screen">
      <h1 className="error-screen__title">404</h1>
      <p className="error-screen__text">Страница не найдена</p>
      <button className="error-screen__button" onClick={goBack}>
        Назад
      </button>
    </div>
  );
}

export default ErrorScreen;
