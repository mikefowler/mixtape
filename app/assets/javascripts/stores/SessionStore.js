import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import UserActions from '../actions/UserActions';
import { createStore } from '../utils/StoreUtils';

var _accessToken = localStorage.getItem('accessToken');
var _refreshToken = localStorage.getItem('refreshToken');
var _currentUser = JSON.parse(localStorage.getItem('currentUser'));

var SessionStore = createStore({
  isLoggedIn() {
    return _currentUser ? true : false;
  },

  getCurrentUser() {
    return _currentUser;
  }
});

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {

  const { action } = payload;
  const { type, response } = action;

  switch (type) {

    case ActionTypes.REQUEST_LOGIN_SUCCESS:
      _accessToken = response.accessToken;
      _refreshToken = response.refreshToken;
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
      _currentUser = response;
      localStorage.setItem('currentUser', JSON.stringify(_currentUser));
      SessionStore.emitChange();
      break;

    default:
      // no-op
  }

  return true;
});

export default SessionStore;
