import AppDispatcher from '../dispatcher/AppDispatcher.js';
import SessionConstants from '../constants/SessionConstants.js';
import APIUtils from '../utils/APIUtils.js';

const SessionActionCreators = {

  login: function(data) {
    console.log('SessionActionCreators::login');
    APIUtils.login();
  },

  logout: function() {
    console.log('SessionActionCreators::logout');
    AppDispatcher.handleViewAction({
      type: SessionConstants.LOGOUT
    });
  },

  getCurrentUser: function() {
    console.log('SessionActionCreators::getCurrentUser');
    APIUtils.getCurrentUser();
  }

};

export default SessionActionCreators;