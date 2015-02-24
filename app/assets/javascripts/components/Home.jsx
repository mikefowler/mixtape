import React from 'react';
import Router from 'react-router';
import SessionActionCreators from '../actions/SessionActionCreators.js';

const { Link } = Router;

let Home = React.createClass({

  render() {
    var isLoggedIn = null;
    var userGreeting = null;

    if (!this.props.isLoggedIn) {
      isLoggedIn = <a href="#" className="btn btn-primary" onClick={this.login}>
        Login using Spotify
      </a>;
    }

    if (this.props.currentUser) {
      userGreeting = (
        <div>
          <h4>Hey there, {this.props.currentUser.display_name}!</h4>
          <img className="img-circle" src={this.props.currentUser.images[0].url} width="50" height="50" />
        </div>
      );
    }

    return (
      <div className="jumbotron text-center">
        <p>Create personalized mixtapes from your Spotify playlists.</p>
        {userGreeting}
        {isLoggedIn}
      </div>
    );
  },

  login(e) {
    e.preventDefault();
    SessionActionCreators.login();
  }

});

export default Home;