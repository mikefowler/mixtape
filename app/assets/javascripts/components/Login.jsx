const React = require('react');
const Qs = require('qs');

import { auth } from '../lib/auth.js';

export var Login = React.createClass({

  componentDidMount: function() {
    var params = Qs.parse(window.location.search.substring(1));

    if (params['access_token'] && window.opener && window.opener.setAuthenticationData) {
      window.opener.setAuthenticationData(params);
      return;
    }
  },

  render: function() {
    return <div></div>;
  }

});