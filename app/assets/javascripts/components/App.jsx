const React = require('react');
const Router = require('react-router');
const { RouteHandler } = Router;

import { Header } from './Header.jsx';

export var App = React.createClass({
  render: function() {
    return (
      <div>
        <Header/>
        <main>
          <RouteHandler/>
        </main>
      </div>
    );
  }
});