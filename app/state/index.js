/** @flow */

import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import auth, { loginEpic, logoutEpic, rehydrateAuthEpic, fetchProfileEpic } from 'app/state/auth';
import notifications from 'app/state/notifications';

export const rootReducer = combineReducers({
  auth,
  notifications,
  routing: routerReducer
});

export const rootEpic = combineEpics(
  rehydrateAuthEpic,
  loginEpic,
  logoutEpic,
  fetchProfileEpic
);
