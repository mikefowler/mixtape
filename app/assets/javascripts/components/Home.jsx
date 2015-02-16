const React = require('react');
const Router = require('react-router');

const { Link } = Router;

import { auth } from '../lib/auth.js';

export var Home = React.createClass({

  handleLogin: function(e) {
    e.preventDefault();
    auth.login();
  },

  render: function() {
    var isLoggedIn = this.props.loggedIn ?
      <Link to="logout">Logout</Link> :
      <a href="#" className="btn btn-primary" onClick={this.handleLogin}>Login using Spotify</a>;

    return (
      <div className="jumbotron text-center">
        <p>Create personalized mixtapes from your Spotify playlists.</p>
        {isLoggedIn}
      </div>
    );
  }

});