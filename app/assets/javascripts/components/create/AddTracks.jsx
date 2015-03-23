import React from 'react';
import PlaylistStore from '../../stores/PlaylistStore';
import PlaylistActions from '../../actions/PlaylistActions';
import connectToStores from '../../utils/connectToStores';

function parseUsername({ session }) {
  return session.currentUser && session.currentUser.id;
}

function parsePlaylistId({ fieldValues }) {
  return fieldValues.playlist;
}

let AddTracks = React.createClass({
  componentDidMount() {
    const username = parseUsername(this.props);
    const playlistId = parsePlaylistId(this.props);

    PlaylistActions.requestPlaylist(username, playlistId);
  },

  render() {
    let playlist = this.props.playlist;
    let tracks = playlist.tracks && playlist.tracks.items;

    return (
      <div>
        <h2>{playlist.name}</h2>

        <h3>Tracks</h3>
        <ol>
          {tracks && tracks.map((t) => {
            return <li>“{t.track.name}” by {t.track.artists[0].name}</li>;
          })}
        </ol>
      </div>
    );
  }
});

function pickProps(params) {
  return params;
}

function getState(params) {
  const playlistId = params.fieldValues.playlist;
  const playlist = PlaylistStore.get(playlistId);

  return { playlist };
}

export default connectToStores(AddTracks,
  [PlaylistStore],
  pickProps,
  getState);
