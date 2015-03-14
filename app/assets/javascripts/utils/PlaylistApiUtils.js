import xhr from './xhr';

export default {

  fetchPlaylistsForUser(uid) {
    return xhr(`/users/${uid}/playlists`);
  },

  requestPlaylist(uid, playlistId) {
    const url = `/users/${uid}/playlists/${playlistId}`;

    return xhr(url);
  },

  requestPlaylistPage(uid, serverSuppliedUrl) {
    const url = serverSuppliedUrl || `/users/${uid}/playlists`;

    return xhr(url);
  }
}
