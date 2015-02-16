const React = require('react');

import { auth } from '../lib/auth.js';

export var Logout = React.createClass({

  componentDidMount: function() {
    auth.logout();
  },

  render: function() {
    return <p>You are now logged out.</p>;
  }

});