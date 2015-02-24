import { Dispatcher } from 'flux';

const AppDispatcher = Object.assign(new Dispatcher(), {

  handleServerAction: function(action) {
    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  },

  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }

});

// AppDispatcher.register(function(action) {
//   console.log(action);
// });

export default AppDispatcher;