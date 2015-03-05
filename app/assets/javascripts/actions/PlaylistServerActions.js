import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const PlaylistServerActions = {

  receivePlaylists: function(playlists) {
    console.log('PlaylistServerActions::receivePlaylists');
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_PLAYLISTS_SUCCESS,
      json: playlists
    });
  }

};

export default PlaylistServerActions;