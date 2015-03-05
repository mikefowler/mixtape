import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const SessionServerActions = {

  receiveLogin: function(response) {
    console.log('SessionServerActions::receiveLogin');
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_LOGIN_SUCCESS,
      json: response
    });
  }

};

export default SessionServerActions;