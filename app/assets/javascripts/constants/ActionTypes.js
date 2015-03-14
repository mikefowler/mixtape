import keyMirror from 'keymirror';

const ActionTypes = keyMirror({

  REQUEST_LOGIN: null,
  REQUEST_LOGIN_SUCCESS: null,
  REQUEST_LOGOUT: null,

  REQUEST_CURRENT_USER: null,
  REQUEST_CURRENT_USER_SUCCESS: null,

  REQUEST_USER_PLAYLISTS: null,
  REQUEST_USER_PLAYLISTS_SUCCESS: null,
  REQUEST_USER_PLAYLISTS_ERROR: null

});

export default ActionTypes;
