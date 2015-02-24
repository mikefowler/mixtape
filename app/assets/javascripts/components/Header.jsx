import React from 'react';
import Router from 'react-router';
import SessionActionCreators from '../actions/SessionActionCreators.js';

const ReactPropTypes = React.PropTypes;
const { Link } = Router;

let Header = React.createClass({

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string
  },

  login(e) {
    e.preventDefault();
    SessionActionCreators.login();
  },

  logout(e) {
    e.preventDefault();
    SessionActionCreators.logout();
  },

  render() {
    var authLink = this.props.isLoggedIn ?
      <a href="#" onClick={this.logout}>Logout</a> :
      <a href="#" onClick={this.login}>Log In</a>;

    return (
      <header className="navbar navbar-default" role="banner">
        <div className="container">
          <div className="navbar-header">
            <Link to="app" className="navbar-brand">Mixtape</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>{authLink}</li>
          </ul>
        </div>
      </header>
    );
  }

});

export default Header;