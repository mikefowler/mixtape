import AppDispatcher from '../dispatcher/AppDispatcher';
import PlaylistStore from './PlaylistStore';
import ActionTypes from '../constants/ActionTypes';
import { createIndexedListStore, createListActionHandler } from '../utils/PaginatedStoreUtils';

const PlaylistsByUserStore = createIndexedListStore({
  getPlaylists(uid) {
    return this.getIds(uid).map(PlaylistStore.get);
  }
});

const handleListAction = createListActionHandler({
  request: ActionTypes.REQUEST_USER_PLAYLISTS,
  success: ActionTypes.REQUEST_USER_PLAYLISTS_SUCCESS,
  error: ActionTypes.REQUEST_USER_PLAYLISTS_ERROR
});

AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([PlaylistStore.dispatchToken]);

  const { action } = payload;
  const { type, uid } = action;

  if (uid) {
    handleListAction(
      action,
      PlaylistsByUserStore.getList(uid),
      PlaylistsByUserStore.emitChange
    );
  }

});

export default PlaylistsByUserStore;
