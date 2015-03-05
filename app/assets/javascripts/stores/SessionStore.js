import { EventEmitter } from 'eventemitter3';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import UserActions from '../actions/UserActions';

const CHANGE_EVENT = 'change';

var _accessToken = localStorage.getItem('accessToken');
var _refreshToken = localStorage.getItem('refreshToken');
var _currentUser = JSON.parse(localStorage.getItem('currentUser'));

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

  getAccessToken: function() {
    return _accessToken;
  }

});

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch (payload.actionType) {

    case ActionTypes.REQUEST_LOGIN_SUCCESS:
      _accessToken = payload.json.accessToken;
      _refreshToken = payload.json.refreshToken;
      localStorage.setItem('accessToken', _accessToken);
      localStorage.setItem('refreshToken', _refreshToken);
      UserActions.requestCurrentUser();
      break;

    case ActionTypes.REQUEST_LOGOUT:
      _accessToken = null;
      _refreshToken = null;
      _currentUser = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      SessionStore.emitChange();
      break;

    case ActionTypes.REQUEST_CURRENT_USER_SUCCESS:
      _currentUser = payload.json;
      localStorage.setItem('currentUser', JSON.stringify(_currentUser));
      SessionStore.emitChange();
      break;

    default:
      // no-op
  }

  return true;
});

export default SessionStore;