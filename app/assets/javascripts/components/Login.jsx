import React from 'react';
import Qs from 'qs';

const Login = React.createClass({

  componentDidMount() {
    var params = Qs.parse(window.location.search.substring(1));

    console.log(params);
    console.log(window.opener.setAuthenticationData);

    if (params['access_token'] && window.opener && window.opener.setAuthenticationData) {
      window.opener.setAuthenticationData(params);
      return;
    }
  },

  render() {
    return <div></div>;
  }

});

export default Login;