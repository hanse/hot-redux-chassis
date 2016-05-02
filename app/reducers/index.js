import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from 'app/reducers/auth';

export default combineReducers({
  auth,
  routing: routerReducer
});
