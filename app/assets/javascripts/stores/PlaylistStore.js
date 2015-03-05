import { EventEmitter } from 'eventemitter3';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

const CHANGE_EVENT = 'change';

var _playlists = {};

var PlaylistStore = Object.assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get(id) {
    return _playlists[id];
  },

  getAll() {
    return _playlists;
  }

});

PlaylistStore.dispatchToken = AppDispatcher.register(function(payload) {
  switch(payload.actionType) {

    case ActionTypes.REQUEST_USER_PLAYLISTS_SUCCESS:
      let data = payload.json;
      data.items.forEach(function(item) {
        if (!_playlists.hasOwnProperty(item.id)) {
          _playlists[item.id] = item;
        }
      });
      PlaylistStore.emitChange();
      break;

    default:
      // no-op
  }

  return true;
});

export default PlaylistStore;