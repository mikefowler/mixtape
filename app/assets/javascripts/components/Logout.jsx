import React from 'react';
import SessionActions from '../actions/SessionActions';

const Logout = React.createClass({

  componentDidMount() {
    SessionActions.requestLogout();
  },

  render() {
    return <p>You are now logged out.</p>;
  }

});

export default Logout;