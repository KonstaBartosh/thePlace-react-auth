export const BASE_URL = ' https://auth.nomoreparties.co';

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
			'Accept': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
		console.log('Request sent to server');
    return response.json();
  })
  .then((res) => {
		console.log('Response received from server:', res);
    return res;
  })
};


export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
			'Accept': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then((response => response.json()))
  .then((data) => {
		console.log('Response received from server:', data);

    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
  })
  .catch(err => console.log(err))
};