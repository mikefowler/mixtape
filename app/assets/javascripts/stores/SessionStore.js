import { EventEmitter } from 'eventemitter3';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SessionConstants from '../constants/SessionConstants.js';
import SessionActionCreators from '../actions/SessionActionCreators.js';

const CHANGE_EVENT = 'change';

var _accessToken = localStorage.getItem('accessToken');
var _refreshToken = localStorage.getItem('refreshToken');
var _currentUser = JSON.parse(localStorage.getItem('currentUser'));
var _errors = [];

var SessionStore = Object.assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return _currentUser ? true : false;
  },

  getCurrentUser: function() {
    return _currentUser;
  },

  getErrors: function() {
    return _errors;
  }

});

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.type) {

    case SessionConstants.LOGIN_RESPONSE:
      _accessToken = action.json.accessToken;
      _refreshToken = action.json.refreshToken;
      localStorage.setItem('accessToken', _accessToken);
      localStorage.setItem('refreshToken', _refreshToken);
      SessionActionCreators.getCurrentUser();
      break;

    case SessionConstants.LOGOUT:
      _accessToken = null;
      _refreshToken = null;
      _currentUser = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      SessionStore.emitChange();
      break;

    case SessionConstants.CURRENT_USER_RESPONSE:
      _currentUser = action.json;
      localStorage.setItem('currentUser', JSON.stringify(action.json));
      SessionStore.emitChange();
      break;

    default:
      // no-op
  }

  return true;
});

export default SessionStore;