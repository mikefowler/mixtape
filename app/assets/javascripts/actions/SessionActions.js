import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import SessionApiUtils from '../utils/SessionApiUtils';
import SessionServerActions from '../actions/SessionServerActions';
import logError from '../utils/logError';

const SessionActions = {

  requestLogin: function(data) {
    console.log('SessionActions::requestLogin');
    SessionApiUtils.requestLogin().then((data) => {
      SessionServerActions.receiveLogin({
        accessToken: data['access_token'],
        refreshToken: data['refresh_token']
      });
    }).catch(logError);
  },

  requestLogout: function() {
    console.log('SessionActions::requestLogout');
    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_LOGOUT
    });
  }

};

export default SessionActions;
