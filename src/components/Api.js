export class Api {
  constructor(config) {
    this._Url = config.Url;
    this._token = config.headers.authorization;
  }

    // Метод проверки ответ от сервера
  _handleResponse(res) {
    {if (res.ok) {
      return res.json();
    }
    return Promise.reject('Произошла ошибка')
    }
  }

    // Метод получения карточки с сервера
  getInitialCards() {
    return fetch(`${this._Url}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
  }

    // Метод получения данных о пользователе с сервера
  getUserData() {
    return fetch(`${this._Url}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
  }

    // Метод обновления данных пользователя на сервере
  updateUserData(data) {
    return fetch(`${this._Url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.profession
      })
    })
    .then(this._handleResponse)
  }

    // Метод обновления аватар на сервере
  updateAvatar(data) {
    return fetch(`${this._Url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.links
      })
    })
    .then(this._handleResponse)
  }

    // Метод добавления новой карточки на сервер
  addNewCard(data) {
    return fetch(`${this._Url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse)
  }

    // Метод удаления карточки с сервера
  deleteCard(_id) {
    return fetch(`${this._Url}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
  }

    // Метод добавления "лайк"
  addLike(_id) {
    return fetch(`${this._Url}/cards/likes/${_id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse)
  }

    // Метод удаления "лайк"
  deleteLike(_id) {
    return fetch(`${this._Url}/cards/likes/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
    .then(this._handleResponse)
  }
}
