   
export const BASE_URL = 'https://api.praktikumkristina.kristina.nomoredomains.sbs';

const checkResponse = (response) => {
  console.log('response: ', response);
  if (response.ok) {
    return response.json();
  }

  return response.json().then((res) => {
    throw res.message[0].messages[0].message;
  })
}
  
export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
    
  };

export const authorize = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(checkResponse)
    };

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
        'Content-Type': 'application/json',
       },
    })
    .then(checkResponse);
  };
