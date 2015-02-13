const React = require('react');
const Router = require('react-router');
const { Link } = Router;

export var Home = React.createClass({

  render: function() {
    return (
      <div>
        <p>Home</p>
        <ul>
          <li><Link to="login">Login</Link></li>
        </ul>
      </div>
    );
  }

});