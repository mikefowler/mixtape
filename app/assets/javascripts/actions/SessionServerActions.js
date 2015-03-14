import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const SessionServerActions = {

  receiveLogin: function(response) {
    console.log('SessionServerActions::receiveLogin');
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_LOGIN_SUCCESS,
      response: response
    });
  }

};

export default SessionServerActions;
