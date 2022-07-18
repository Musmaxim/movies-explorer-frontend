    class MainApi {
        constructor({baseUrl}) {
            this._baseUrl = baseUrl;
        }

    static checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
        }})
        .then(MainApi.checkResponse);
    }
    
    updateUserInfo({ name, email }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({ name, email })
        })
        .then(MainApi.checkResponse);
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(MainApi.checkResponse);

    }

    addMovie ({
        movieId,
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
    }) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                movieId,
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                thumbnail,
                nameRU,
                nameEN,
            })
        }).then(MainApi.checkResponse);
    }

    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(MainApi.checkResponse);
    }
}

const mainApi = new MainApi({
    baseUrl: 'https://api.backend.musmaxim.nomoreparties.sbs',
});

export default mainApi;