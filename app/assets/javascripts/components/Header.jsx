const React = require('react');
const Router = require('react-router');

const { Link } = Router;

export var Header = React.createClass({
  render: function() {
    var authLink = this.props.loggedIn ?
      <Link to="logout">Logout</Link> :
      <a href="#">Log In</a>;
    return (
      <header className="navbar navbar-default" role="banner">
        <div className="container">
          <div className="navbar-header">
            <Link to="app" className="navbar-brand">Mixtape</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li>{authLink}</li>
          </ul>
        </div>
      </header>
    );
  }
});