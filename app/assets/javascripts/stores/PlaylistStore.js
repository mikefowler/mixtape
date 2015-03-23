import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import { createStore, mergeIntoBag } from '../utils/StoreUtils';

const CHANGE_EVENT = 'change';

const _playlists = {};

const PlaylistStore = createStore({
  get(id) {
    return _playlists[id];
  },

  getAll() {
    return _playlists;
  }
});

PlaylistStore.dispatchToken = AppDispatcher.register(function(payload) {
  const { response } = payload.action;
  const entities = response && response.entities;
  let fetchedPlaylists = entities && entities.playlists;

  if (fetchedPlaylists) {
    mergeIntoBag(_playlists, fetchedPlaylists);
    PlaylistStore.emitChange();
  }
});

export default PlaylistStore;
