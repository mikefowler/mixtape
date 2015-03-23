import AppDispatcher from '../dispatcher/AppDispatcher';
import PlaylistsByUserStore from '../stores/PlaylistsByUserStore';
import PlaylistStore from '../stores/PlaylistStore';
import PlaylistApiUtils from '../utils/PlaylistApiUtils';
import PlaylistServerActions from './PlaylistServerActions';
import ActionTypes from '../constants/ActionTypes';
import logError from '../utils/logError';
import { normalizePlaylistResponse } from '../utils/ApiUtils';

const PlaylistActions = {

  requestPlaylist(username, id) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_PLAYLIST
    });

    PlaylistApiUtils.requestPlaylist(username, id).then((res) => {
      const response = normalizePlaylistResponse(res);
      PlaylistServerActions.handlePlaylistSuccess(response);
    });
  },

  requestPlaylistPage(username, isInitialRequest) {
    if (PlaylistsByUserStore.isExpectingPage(username) ||
        PlaylistsByUserStore.isLastPage(username)) {
      return;
    }

    if (isInitialRequest && PlaylistsByUserStore.getPageCount(username) > 0) {
      return;
    }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_USER_PLAYLISTS,
      uid: username
    });

    const nextPageUrl = PlaylistsByUserStore.getNextPageUrl(username);
    PlaylistApiUtils.requestPlaylistPage(username, nextPageUrl).then((res) => {
      const response = normalizePlaylistResponse(res);
      PlaylistServerActions.handlePlaylistPageSuccess(username, response);
    });
  }

};

export default PlaylistActions;
