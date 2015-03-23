import 'whatwg-fetch';
import React from 'react';
import Router from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Create from './pages/Create';

const { Route, DefaultRoute, RouteHandler, Link } = Router;

var routes = (
  <Route name="app" handler={App} path="/">
    <Route name="create" handler={Create} path="create"/>
    <Route name="login" handler={Login} path="login"/>
    <Route name="logout" handler={Logout} path="logout"/>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('mixtape'));
});
