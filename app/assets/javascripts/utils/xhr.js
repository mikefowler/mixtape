const API_URL = 'https://api.spotify.com/v1';

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

const handle401 = (resolve, reject, path) => {

  let refreshToken = localStorage.getItem('refreshToken');

  let onSuccess = (response) => {
    localStorage.setItem('accessToken', response.access_token);
    xhr(path).then(resolve, reject);
  };

  let onError = () => {
    // no-op
  };

  fetch(`/auth/refresh_token?refresh_token=${refreshToken}`)
    .then(status)
    .then(json)
    .then(onSuccess, onError);

};

const handleError = (response, resolve, reject, path) => {
  if (response.status === 401) {
    handle401(resolve, reject, path);
    return;
  }

  reject(new Error(response.statusText));
};

const xhr = (path, params = {}) => {
  let accessToken = localStorage.getItem('accessToken');
  let url = path;

  if (url.indexOf(API_URL) !== 0) {
    url = API_URL + path;
  }

  params = Object.assign({
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  }, params);

  return new Promise((resolve, reject) => {
    fetch(url, params).then(function(response) {
      var responseData;

      if (response.status >= 400) {
        handleError(response, resolve, reject, path);
      } else {
        responseData = json(response);
        resolve(responseData);
      }
    });
  });

};

export default xhr;
