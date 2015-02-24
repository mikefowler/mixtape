import SessionConstants from '../constants/SessionConstants';
import AppDispatcher from '../dispatcher/AppDispatcher.js';

const APIActionCreators = {

  receiveLogin: function(err, res) {
    console.log('APIActionCreators::receiveLogin');
    AppDispatcher.handleServerAction({
      type: SessionConstants.LOGIN_RESPONSE,
      json: res
    });
  },

  receiveCurrentUser: function(err, res) {
    console.log('APIActionCreators::receiveCurrentUser');
    AppDispatcher.handleServerAction({
      type: SessionConstants.CURRENT_USER_RESPONSE,
      json: res
    });
  }

};

export default APIActionCreators;