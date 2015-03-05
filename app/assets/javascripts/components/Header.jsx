import React from 'react';
import Router from 'react-router';
import SessionActions from '../actions/SessionActions';

const ReactPropTypes = React.PropTypes;
const { Link } = Router;

let Header = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string
  },

  handleLogin(e) {
    e.preventDefault();
    SessionActions.requestLogin();
  },

  handleLogout(e) {
    e.preventDefault();
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
    return (
      <ul className="nav navbar-nav navbar-right">
        { this.props.isLoggedIn ? <li><Link to="playlists">Make a Mixtape</Link></li> : null }
        <li>{ this.props.isLoggedIn ?
          <a href="#" onClick={this.handleLogout}>Logout</a> :
          <a href="#" onClick={this.handleLogin}>Login</a> }</li>
      </ul>
    );
  }

});

export default Header;