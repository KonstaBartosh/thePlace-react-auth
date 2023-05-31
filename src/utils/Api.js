class Api {
	constructor(config) {
		this._url = config.url
		this._headers = config.headers;
	}

	/**Проверить на ошибки */
	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Упс...Ошибка: ${res.status}`);
	};

	getInitialCardsApi() {
		return fetch(`${this._url}/cards`, {
			headers: this._headers,
		}).then(this._checkResponse)
	}

	addCardApi(data) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				link: data.link
			})
		})
			.then(this._checkResponse)
	}

	getUserDataApi() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers,
		}).then(this._checkResponse);
	}

	changeUserDataApi(data) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about
			})
		}).then(this._checkResponse);
	}

	changeUserAvatarApi(data) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: data.avatar
			})
		}).then(this._checkResponse);
	}

	deleteCardApi(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		}).then(this._checkResponse);
	}

	changeLikeCardStatus(cardId, isCurrentUserLiked) {
		if (!isCurrentUserLiked) {
			return fetch(`${this._url}/cards/${cardId}/likes`, {
				method: 'DELETE',
				headers: this._headers,
			})
				.then(this._checkResponse);
		} else {
			return fetch(`${this._url}/cards/${cardId}/likes`, {
				method: 'PUT',
				headers: this._headers,
			})
				.then(this._checkResponse);
		}
	}
}

export const api = new Api({
	url: 'https://mesto.nomoreparties.co/v1/cohort-64',
	headers: {
		authorization: '3fea5f60-ca24-4403-9861-1d6a72c9cf2f',
		'Content-Type': 'application/json'
	}
});