import Qs from 'qs';
import request from 'superagent';
import APIActionCreators from '../actions/APIActionCreators.js';

const API_URL = 'https://api.spotify.com/v1';
const TIMEOUT = 10000;

var _pendingRequests = {};

function abortPendingRequests(key) {
  if (_pendingRequests[key]) {
    _pendingRequests[key]._callback = function(){};
    _pendingRequests[key].abort();
    _pendingRequests[key] = null;
  }
}

function makeUrl(endpoint) {
  return API_URL + endpoint;
}

function token() {
  return localStorage.getItem('accessToken');
}

function get(url) {
  console.log('APIUtils::get');
  return request
    .get(url)
    .timeout(TIMEOUT)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + token());
}

const APIUtils = {

  login: function() {
    console.log('APIUtils::login');
    var popup;
    var popupOptions;
    var popupCallback;
    var accessToken;
    var refreshToken;

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

      window.setAuthenticationData = null;
      delete window.setAuthenticationData;

      APIActionCreators.receiveLogin(null, {
        accessToken: data['access_token'] || null,
        refreshToken: data['refresh_token'] || null
      });

    }.bind(this);

    window.setAuthenticationData = function(data) {
      popupCallback(data);
    }.bind(this);
  },

  getCurrentUser: function() {
    console.log('APIUtils::getCurrentUser');
    get(makeUrl('/me')).end(function(err, res) {
      if (res) {
        if (res.error) {
          APIActionCreators.receiveCurrentUser(res.error, null);
        } else {
          APIActionCreators.receiveCurrentUser(null, res.body);
        }
      }
    });
  }

};

export default APIUtils;