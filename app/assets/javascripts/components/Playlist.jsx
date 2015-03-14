import React from 'react';

let Playlist = React.createClass({

  render() {
    return <li>{this.props.playlist.name}</li>;
  }

});

export default Playlist;
