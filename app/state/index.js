// @flow

import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import auth, {
  loginEpic,
  logoutEpic,
  rehydrateAuthEpic,
  fetchProfileEpic
} from 'app/state/auth';
import notifications, { errorNotificationEpic } from 'app/state/notifications';
import ui from 'app/state/ui';
import results, {
  searchEpic,
  clearSearchEpic,
  searchResultSelectedEpic
} from 'app/state/search';
import posts, { fetchPostsEpic, refreshPostsEpic } from 'app/state/posts';

const reducers = {
  auth,
  notifications,
  ui,
  posts,
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
  clearSearchEpic,
  searchResultSelectedEpic,
  fetchPostsEpic,
  refreshPostsEpic
);
