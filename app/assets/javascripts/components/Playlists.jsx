import React from 'react';
import Router from 'react-router';
import PlaylistByUserStore from '../stores/PlaylistsByUserStore';
import PlaylistActions from '../actions/PlaylistActions';
import Playlist from './Playlist';

let { Navigation } = Router;

function getStateFromStores(props) {
  return {
    playlists: PlaylistByUserStore.getPlaylists(props.currentUser.id)
  };
}

let Playlists = React.createClass({

  mixins: [Navigation],

  getInitialState() {
    return getStateFromStores(this.props);
  },

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.transitionTo('app');
      return;
    }
  },

  componentDidMount() {
    PlaylistByUserStore.addChangeListener(this._onChange);
    PlaylistActions.requestPlaylistPage(this.props.currentUser.id, true);
  },

  componentWillUnmount() {
    PlaylistByUserStore.removeChangeListener(this._onChange);
  },

  render() {
    const uid = this.props.currentUser.id;
    const { playlists } = this.state;
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
    const uid = this.props.currentUser.id;
    PlaylistActions.requestPlaylistPage(uid);
  },

  _onChange() {
    this.setState(getStateFromStores(this.props));
  }

});

export default Playlists;
