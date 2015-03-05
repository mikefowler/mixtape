import React from 'react';

let Playlist = React.createClass({

  render() {
    return <li>{this.props.model.name}</li>;
  }

});