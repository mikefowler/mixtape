import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const UserServerActions = {

  receiveCurrentUser: function(user) {
    console.log('UserServerActions::receiveCurrentUser');
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_CURRENT_USER_SUCCESS,
      response: user
    });
  }

};

export default UserServerActions;
