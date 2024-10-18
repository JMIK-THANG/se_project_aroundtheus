export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Method for Checking any response from the server
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
  }
  // Method for fetching and checking responses
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
  getInitialCards() {
    const url = `${this._baseUrl}/cards`;
    const options = { headers: this._headers };
    // method: "GET",
    return this._request(url, options);
  }
  // User Info
  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;
    const options = {
      method: "GET",
      headers: this._headers,
    };
    return this._request(url, options);
  }
  // Update user profile
  updateUserInfo(name, about) {
    const url = `${this._baseUrl}/users/me`;
    const options = {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    };
    return this._request(url, options);
  }
  // Update avatar
  updateUserPicture(avatar) {
    const url = `${this._baseUrl}/users/me/avatar`;
    const options = {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    };
    return this._request(rul, options);
  }

  // Adding a new card
  addNewCards(name, link) {
    const url = `${this._baseUrl}/cards`;
    const options = {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    };

    return this._request(url, options);
  }

  // Delete card
  deleteCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;
    const options = {
      method: "DELETE",
      headers: this._headers,
    };
    return this._request(url, options);
  }
  // Like card

  likeCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    const options = {
      method: "PUT",
      headers: this._headers,
    };
    return this._request(url, options);
  }
  disLikeCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;
    const options = {
      method: "DELETE",
      headers: this._headers,
    };
    return this._request(url, options);
  }
}
