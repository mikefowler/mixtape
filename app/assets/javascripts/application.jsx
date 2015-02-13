const React = require('react');
const Router = require('react-router');
const { Route, DefaultRoute, RouteHandler, Link } = Router;

import { App } from './components/App.jsx';
import { Home } from './components/Home.jsx';
import { Login } from './components/Login.jsx';

// Set up routes

var routes = (
  <Route handler={App} path="/">
    <Route name="login" handler={Login}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementById('mixtape'));
});