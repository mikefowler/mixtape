import UserApiUtils from '../utils/UserApiUtils';
import UserServerActions from '../actions/UserServerActions';
import logError from '../utils/logError';

const UserActions = {

  requestCurrentUser: function() {
    console.log('UserActions::requestCurrentUser');
    UserApiUtils.fetchCurrentUser().then((user) => {
      UserServerActions.receiveCurrentUser(user);
    }).catch(logError);
  }

};

export default UserActions;