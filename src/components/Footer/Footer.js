import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className="footer__container">
                <p className="footer__copyright">&copy; 2022</p>

                <nav className="footer__nav">
                    <ul className="footer__nav-list">
                        <li className="footer__nav-item">
                            <a className="footer__nav-link" href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                        </li>
                        <li className="footer__nav-item">
                            <a className="footer__nav-link" href="https://github.com/Musmaxim/" target="_blank" rel="noreferrer">Github</a>
                        </li>
                        <li className="footer__nav-item">
                            <a className="footer__nav-link" href="https://t.me/Musmaxim" target="_blank" rel="noreferrer">Telegram</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    )}

        export default Footer;