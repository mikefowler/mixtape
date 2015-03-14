import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const PlaylistServerActions = {

  handlePlaylistPageSuccess: function(uid, response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_USER_PLAYLISTS_SUCCESS,
      uid: uid,
      response: response
    });
  },

  handlePlaylistPageError: function(login, err) {

  }

};

export default PlaylistServerActions;
