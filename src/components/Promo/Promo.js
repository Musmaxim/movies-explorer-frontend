import './Promo.css';

function Promo () {
    return (
        <>
            <section className='promo'>
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
                <nav className='container-links'>
                <a href='#about-project'><button className='container-link'>О проекте</button></a>
                <a href='#techs'><button className='container-link'>Технологии</button></a>
                <a href='#about-me'><button className='container-link'>Студент</button></a>
                </nav>
            </section>
        </>
    )
}

export default Promo;