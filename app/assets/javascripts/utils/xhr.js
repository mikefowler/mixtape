const API_URL = 'https://api.spotify.com/v1';

const token = () => {
  return localStorage.getItem('accessToken');
};

const status = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

const json = (response) => {
  if (response.status !== 204) {
    return response.json();
  } else {
    return {};
  }
};

const xhr = (url, params = {}) => {
  params = Object.assign({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token()}`
    }
  }, params);

  return fetch(API_URL + url, params)
    .then(status)
    .then(json);
};

export default xhr;