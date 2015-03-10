import SessionStore from '../stores/SessionStore';
import PlaylistApiUtils from '../utils/PlaylistApiUtils';
import PlaylistServerActions from './PlaylistServerActions';
import logError from '../utils/logError';

const PlaylistActions = {

  requestUserPlaylists() {
    console.log('PlaylistActions::requestUserPlaylists');
    let userId = SessionStore.getCurrentUser().id;
    PlaylistApiUtils.fetchPlaylistsForUser(userId).then((playlists) => {
      console.log('fetched playlists', playlists);
      PlaylistServerActions.receivePlaylists(playlists);
    }).catch(logError);
  }

};

export default PlaylistActions;