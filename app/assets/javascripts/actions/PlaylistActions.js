import AppDispatcher from '../dispatcher/AppDispatcher';
import PlaylistsByUserStore from '../stores/PlaylistsByUserStore';
import PlaylistStore from '../stores/PlaylistStore';
import PlaylistApiUtils from '../utils/PlaylistApiUtils';
import PlaylistServerActions from './PlaylistServerActions';
import ActionTypes from '../constants/ActionTypes';
import logError from '../utils/logError';

const PlaylistActions = {

  requestPlaylist(id) {

  },

  requestPlaylistPage(uid, isInitialRequest) {
    if (PlaylistsByUserStore.isExpectingPage(uid) ||
        PlaylistsByUserStore.isLastPage(uid)) {
      return;
    }

    if (isInitialRequest && PlaylistsByUserStore.getPageCount(uid) > 0) {
      return;
    }

    AppDispatcher.handleViewAction({
      type: ActionTypes.REQUEST_USER_PLAYLISTS,
      uid: uid
    });

    const nextPageUrl = PlaylistsByUserStore.getNextPageUrl(uid);
    PlaylistApiUtils.requestPlaylistPage(uid, nextPageUrl).then((response) => {
      PlaylistServerActions.handlePlaylistPageSuccess(uid, response);
    });
  }

};

export default PlaylistActions;
