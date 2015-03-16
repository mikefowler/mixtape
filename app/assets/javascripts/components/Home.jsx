import React from 'react';
import Router from 'react-router';
import SessionActions from '../actions/SessionActions';

const { Link } = Router;

let Home = React.createClass({

  render() {
    const { session } = this.props;
    const { currentUser } = session;

    var isLoggedIn = null;
    var userGreeting = null;

    if (!session.isLoggedIn) {
      isLoggedIn = <a href="#" className="btn btn-primary" onClick={this.login}>
        Login using Spotify
      </a>;
    }

    if (currentUser) {
      userGreeting = (
        <div>
          <h4>Hey there, {currentUser.display_name}!</h4>
          <img className="img-circle" src={currentUser.images[0].url} width="50" height="50" />
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
    SessionActions.requestLogin();
  }

});

export default Home;
