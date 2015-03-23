import ActionTypes from '../constants/ActionTypes';
import AppDispatcher from '../dispatcher/AppDispatcher';

const PlaylistServerActions = {

  handlePlaylistSuccess(response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_PLAYLIST_SUCCESS,
      response: response
    });
  },

  handlePlaylistPageSuccess(uid, response) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.REQUEST_USER_PLAYLISTS_SUCCESS,
      uid: uid,
      response: response
    });
  }

};

export default PlaylistServerActions;
