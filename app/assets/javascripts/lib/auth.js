const Qs = require('qs');

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const ACCESS_TOKEN_REGEX = new RegExp('[&]?' + ACCESS_TOKEN_KEY + '=[^\&]+');
const REFRESH_TOKEN_REGEX = new RegExp('[&]?' + REFRESH_TOKEN_KEY + '=[^\&]+');

export var auth = {

  ACCESS_TOKEN_KEY: ACCESS_TOKEN_KEY,

  REFRESH_TOKEN_KEY: REFRESH_TOKEN_KEY,

  login: function(cb) {
    var popup, popupOptions, popupCallback, setAuthenticationData;

    popupOptions = {
      status: 0,
      toolbar: 0,
      location: 0,
      menubar: 0,
      width: 400,
      height: 400
    };

    popup = window.open(
      '/auth/login',
      'Login with Spotify',
      Qs.stringify(popupOptions, { delimiter: ','}));

    popupCallback = function(data) {

      if (popup) popup.close();

      if (data['access_token']) {
        this.setToken(this.ACCESS_TOKEN_KEY, data['access_token']);
      }

      if (data['refresh_token']) {
        this.setToken(this.REFRESH_TOKEN_KEY, data['refresh_token']);
      }

      window.setAuthenticationData = null;
      delete window.setAuthenticationData;

      this.onChange(true);

      if (cb) cb();

    }.bind(this);

    window.setAuthenticationData = function(data) {
      popupCallback(data);
    }.bind(this);

  },

  logout: function(cb) {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    if (cb) cb();
    this.onChange(false);
  },

  isLoggedIn: function() {
    return this.getToken(this.ACCESS_TOKEN_KEY) !== null;
  },

  getToken: function(tokenKey) {
    return localStorage.getItem(tokenKey);
  },

  setToken: function(tokenKey, value) {
    localStorage.setItem(tokenKey, value);
  },

  onChange: function() {}

};