import { Dispatcher } from 'flux';
import PayloadSources from '../constants/PayloadSources';

const AppDispatcher = Object.assign(new Dispatcher(), {
  handleServerAction(action) {
    // console.log('Server action:', action);

    if (!action.type) {
      throw new Error('Empty action.type: you may have mistyped the action.');
    }

    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action: action
    });
  },

  handleViewAction(action) {
    // console.log('View action:', action);

    if (!action.type) {
      throw new Error('Empty action.type: you may have mistyped the action.');
    }

    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    });
  }
});

 export default AppDispatcher;
