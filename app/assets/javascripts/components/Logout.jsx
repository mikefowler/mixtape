import React from 'react';
import SessionActionCreators from '../actions/SessionActionCreators.js';

const Logout = React.createClass({

  componentDidMount() {
    SessionActionCreators.logout();
  },

  render() {
    return <p>You are now logged out.</p>;
  }

});

export default Logout;