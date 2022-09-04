export class Api {
  constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    }
}
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards `, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getProfile() {//user info+
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
   }).then(this._checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards `, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id} `, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLike(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkResponse);
    }
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://api.praktikumkristina.kristina.nomoredomains.sbs/",

  });

export default api