import React from 'react';
import Router from 'react-router';
import SessionStore from '../stores/SessionStore';
import Header from './Header';
import connectToStores from '../utils/connectToStores';

const { RouteHandler } = Router;

let App = React.createClass({
  render() {
    return (
      <div>
        <Header session={this.props.session} />
        <main className="container">
          <RouteHandler session={this.props.session} />
        </main>
      </div>
    );
  }
});

function pickProps(props) {
  return props;
}

function getState(props) {
  let session = {
    isLoggedIn: SessionStore.isLoggedIn(),
    currentUser: SessionStore.getCurrentUser()
  };

  return { session };
}

export default connectToStores(App,
  [SessionStore],
  pickProps,
  getState
);
