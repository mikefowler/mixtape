import xhr from './xhr';

export default {
  fetchPlaylistsForUser(id) {
    return xhr(`/users/${id}/playlists`);
  }
}