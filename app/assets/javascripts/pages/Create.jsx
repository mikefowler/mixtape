import React from 'react';
import ChoosePlaylist from '../components/create/ChoosePlaylist';
import AddTracks from '../components/create/AddTracks';

const { PropTypes } = React;

let fieldValues = {
  playlist: null
};

let Create = React.createClass({
  getInitialState() {
    return {
      step: 1
    }
  },

  render() {
    switch(this.state.step) {
    case 1:
      return <ChoosePlaylist {...this.props}
                             fieldValues={fieldValues}
                             nextStep={this.nextStep}
                             saveValues={this.saveValues} />;
    case 2:
      return <AddTracks {...this.props}
                        fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        saveValues={this.saveValues} />;
    }
  },

  saveValues(fields) {
    return function() {
      fieldValues = Object.assign({}, fieldValues, fields);
    }();
  },

  nextStep() {
    this.setState({
      step: this.state.step + 1
    });
  },

  previousStep() {
    this.setState({
      step: this.state.step - 1
    });
  }
});

export default Create;
