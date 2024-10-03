export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error("Something went wrong", err);
      });
  }
  // edit profile
  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: headers, // Content-Type ??? 
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.json) {
          return res.json();
        }
        return Promise.reject(`Error:${res.status}`);
      })
      .catch((err) => {
        console.error("Something went wrong", err);
      });
  }
  // Adding a new card
  addNewCards(name, link) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "POST",
      headers: headers, // Content-Type ??? 
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.json) {
          return res.json();
        }
        return Promise.reject(`Error:${res.status}`);
      })
      .catch((err) => {
        console.error("Something went wrong", err);
      });
  }
  
}
