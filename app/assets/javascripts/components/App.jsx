import React from 'react';
import Router from 'react-router';
import SessionStore from '../stores/SessionStore.js';
import Header from './Header.jsx';

const { RouteHandler } = Router;

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    currentUser: SessionStore.getCurrentUser()
  };
}

let App = React.createClass({

  getInitialState() {
    return getStateFromStores();
  },

  componentDidMount() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(getStateFromStores());
  },

  render() {
    return (
      <div>
        <Header isLoggedIn={this.state.isLoggedIn} />
        <main className="container">
          <RouteHandler isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser} />
        </main>
      </div>
    );
  }

});

export default App;