const React = require('react');
const Router = require('react-router');
const { Route, DefaultRoute, RouteHandler, Link } = Router;

import { App } from './components/App.jsx';
import { Home } from './components/Home.jsx';
import { Login } from './components/Login.jsx';
import { Logout } from './components/Logout.jsx';

import { Auth } from './lib/auth.js';

var routes = (
  <Route name="app" handler={App} path="/">
    <Route name="login" handler={Login} path="login"/>
    <Route name="logout" handler={Logout} path="logout"/>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('mixtape'));
});