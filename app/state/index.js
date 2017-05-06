// @flow

import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import auth, { loginEpic, logoutEpic, rehydrateAuthEpic, fetchProfileEpic } from 'app/state/auth';
import notifications, { errorNotificationEpic } from 'app/state/notifications';
import ui from 'app/state/ui';
import results, { searchEpic, clearSearchEpic } from 'app/state/search';

const reducers = {
  auth,
  notifications,
  ui,
  routing: routerReducer,
  search: results
};

export type Reducers = typeof reducers;

export const rootReducer = combineReducers(reducers);

export const rootEpic = combineEpics(
  rehydrateAuthEpic,
  loginEpic,
  logoutEpic,
  fetchProfileEpic,
  errorNotificationEpic,
  searchEpic,
  clearSearchEpic
);
