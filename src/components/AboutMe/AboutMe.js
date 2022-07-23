import "./AboutMe.css";
import avatar from "../../images/avatar.PNG";

function AboutMe() {
  return (
    <section className="about-me">
      <a name="about-me"></a>
      <h2 className="about-me__header">Студент</h2>

      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Максим</h3>
          <p className="about-me__job">Фронтенд-разработчик, 33 года</p>
          <p className="about-me__description">
            Родился в Санкт-Петербурге, живу в Москве. Получил высшее
            образование по специальности "Защита информации и автоматизированных
            систем". Последние 10 лет работаю в сфере сертификации ПО для нужд
            Минобороны России. Люблю кино, свою жену и менять свою жизнь к
            лучшему.
          </p>

          <ul className="about-me__links">
            <li>
              <a
                className="about-me__link"
                href="https://t.me/Musmaxim"
                target="_blank"
                rel="noreferrer"
              >
                Telegram
              </a>
            </li>
            <li>
              <a
                className="about-me__link"
                href="https://github.com/Musmaxim"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>

        <img src={avatar} alt="about-me" className="about-me__image" />
      </div>
    </section>
  );
}

export default AboutMe;
