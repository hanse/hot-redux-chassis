/** @flow */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from 'app/reducers/auth';
import notifications from 'app/reducers/notifications';

export default combineReducers({
  auth,
  notifications,
  routing: routerReducer
});
