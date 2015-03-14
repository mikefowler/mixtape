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
  const { action } = payload;
  const { response } = action;
  let items = response && response.items;
  let normalizedItems = {};

  if (items) {
    items.forEach(i => normalizedItems[i.id] = i);
    mergeIntoBag(_playlists, normalizedItems);
    PlaylistStore.emitChange();
  }
});

export default PlaylistStore;
