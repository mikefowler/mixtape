const React = require('react');
const Router = require('react-router');
const { RouteHandler } = Router;

import { auth } from '../lib/auth.js';
import { Header } from './Header.jsx';

export var App = React.createClass({

  getInitialState: function() {
    return {
      loggedIn: auth.isLoggedIn()
    };
  },

  setStateOnAuth: function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function() {
    auth.onChange = this.setStateOnAuth;
  },

  render: function() {
    return (
      <div>
        <Header loggedIn={this.state.loggedIn} />
        <main className="container">
          <RouteHandler loggedIn={this.state.loggedIn} />
        </main>
      </div>
    );
  }
});