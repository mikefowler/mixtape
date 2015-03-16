import React from 'react';
import Router from 'react-router';
import PlaylistByUserStore from '../stores/PlaylistsByUserStore';
import PlaylistActions from '../actions/PlaylistActions';
import Playlist from './Playlist';
import connectToStores from '../utils/connectToStores';

const { PropTypes } = React;
let { Navigation } = Router;

function parseUsername(params) {
  let { session } = params;
  return session.currentUser && session.currentUser.id;
}

let Playlists = React.createClass({

  mixins: [Navigation],

  propTypes: {
    session: PropTypes.shape({
      isLoggedIn: PropTypes.bool,
      currentUser: PropTypes.object.isRequired
    })
  },

  componentWillMount() {
    if (!this.props.session.isLoggedIn) {
      this.transitionTo('app');
      return;
    }
  },

  componentDidMount() {
    let username = parseUsername(this.props);
    PlaylistActions.requestPlaylistPage(username, true);
  },

  render() {
    const { session, playlists } = this.props;
    const { currentUser } = session;

    const uid = currentUser.id;
    const isEmpty = playlists.length === 0;
    const isFetching = PlaylistByUserStore.isExpectingPage(uid);
    const isLastPage = PlaylistByUserStore.isLastPage(uid)

    return (
      <div>
        {playlists.map((playlist, index) =>
          <Playlist key={playlist.id} playlist={playlist} />
        )}

        {!isEmpty && (isFetching || !isLastPage) &&
          <button onClick={this.handleLoadMoreClick} disabled={isFetching}>
            {isFetching ? 'Loading…' : 'Load more'}
          </button>
        }
      </div>
    );
  },

  handleLoadMoreClick() {
    const username = parseUsername(this.props);
    PlaylistActions.requestPlaylistPage(username);
  }

});

function pickProps(params) {
  return params;
}

function getState(params) {
  const username = parseUsername(params);
  const playlists = PlaylistByUserStore.getPlaylists(username);

  return { playlists };
}

export default connectToStores(Playlists,
  [PlaylistByUserStore],
  pickProps,
  getState
);
