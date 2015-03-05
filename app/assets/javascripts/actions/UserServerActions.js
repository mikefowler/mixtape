import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const UserServerActions = {

  receiveCurrentUser: function(user) {
    console.log('UserServerActions::receiveCurrentUser');
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_CURRENT_USER_SUCCESS,
      json: user
    });
  }

};

export default UserServerActions;