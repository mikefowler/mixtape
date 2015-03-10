import React from 'react';
import Router from 'react-router';
import PlaylistStore from '../stores/PlaylistStore';
import PlaylistActions from '../actions/PlaylistActions';
import Playlist from './Playlist';

let { Navigation } = Router;

function getStateFromStores() {
  return {
    playlists: PlaylistStore.getAll()
  };
}

let Playlists = React.createClass({

  mixins: [Navigation],

  getInitialState() {
    return getStateFromStores();
  },

  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.transitionTo('app');
      return;
    }
  },

  componentDidMount() {
    PlaylistStore.addChangeListener(this._onChange);
    PlaylistActions.requestUserPlaylists();
  },

  componentWillUnmount() {
    PlaylistStore.removeChangeListener(this._onChange);
  },

  render() {
    let playlists = [];

    for (var key in this.state.playlists) {
      let playlist = this.state.playlists[key];
      playlists.push(<li key={playlist.id}>{playlist.name}</li>);
    }

    return (
      <ul>
        {playlists}
      </ul>
    );
  },

  _onChange() {
    this.setState(getStateFromStores());
  }

});

export default Playlists;