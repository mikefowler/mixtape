import React from 'react';
import Router from 'react-router';
import SessionActions from '../actions/SessionActions';

const { PropTypes } = React;
const { Link, Navigation } = Router;

let Header = React.createClass({

  mixins: [Navigation],

  propTypes: {
    session: PropTypes.shape({
      isLoggedIn: PropTypes.bool,
      currentUser: PropTypes.object
    }).isRequired
  },

  handleLogin(e) {
    e.preventDefault();
    SessionActions.requestLogin();
  },

  handleLogout(e) {
    e.preventDefault();
    this.transitionTo('app');
    SessionActions.requestLogout();
  },

  render() {
    return (
      <header className="navbar navbar-default" role="banner">
        <div className="container">
          <div className="navbar-header">
            <Link to="app" className="navbar-brand">Mixtape</Link>
          </div>
          {this.renderNav()}
        </div>
      </header>
    );
  },

  renderNav() {
    let currentUser = this.props.session.currentUser;

    return (
      <ul className="nav navbar-nav navbar-right">
        {currentUser && <li><Link to="playlists">Make a Mixtape</Link></li>}
        {currentUser && <li><a href="#" onClick={this.handleLogout}>Logout <small>({currentUser.id})</small></a></li>}
        {!currentUser && <li><a href="#" onClick={this.handleLogin}>Login</a></li>}
      </ul>
    );
  }
});

export default Header;
