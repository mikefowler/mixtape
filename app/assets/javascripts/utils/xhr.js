const API_URL = 'https://api.spotify.com/v1';

const token = () => {
  return localStorage.getItem('accessToken');
};

const handle401 = (response) => {
  let url = response.url;

  return new Promise(function(resolve, reject) {

    let refreshToken = localStorage.getItem('refreshToken');

    let onSuccess = (response) => {
      localStorage.setItem('accessToken', response.access_token);
      xhr(url).then(resolve, reject);
    };

    let onFailure = (response) => {
      // no-op
    };

    fetch(`/auth/refresh_token?refresh_token=${refreshToken}`)
      .then(status)
      .then(json)
      .then(onSuccess, onFailure);

  });
};

const status = (response) => {
  if (response.status === 401) {
    return handle401(response);
  } else if (response.status >= 200 && response.status < 300) {
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

  if (url.indexOf(API_URL) !== 0) {
    url = API_URL + url;
  }

  return fetch(url, params)
    .then(status)
    .then(json);
};

export default xhr;