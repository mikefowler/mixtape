import React from 'react';
import Router from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';

const { Route, DefaultRoute, RouteHandler, Link } = Router;

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