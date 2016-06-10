/** @flow */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from 'app/state/auth';
import notifications from 'app/state/notifications';

export default combineReducers({
  auth,
  notifications,
  routing: routerReducer
});
