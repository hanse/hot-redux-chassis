/** @flow */

import { Map } from 'immutable';

export type Action = {
  type: string;
  payload: Object;
  meta?: any;
  error?: Error;
};

export type EmptyAction = {
  type: string;
  meta?: any;
  error?: Error;
};

export type RootState = { [key: string]: Map };
export type AnyAction = Object & Action;
export type Reducer<T> = (state: T, action: AnyAction) => T;
export type Thunk = (dispatch: Dispatch, getState: () => RootState) => any;
export type Dispatch = (action: Action | Thunk | EmptyAction) => Promise;

export const Auth = {
  LOGIN_BEGIN: 'Auth/LOGIN_BEGIN',
  LOGIN_SUCCESS: 'Auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'Auth/LOGIN_FAILURE',
  LOGOUT: 'Auth/LOGOUT',
  FETCH_PROFILE_BEGIN: 'Auth/FETCH_PROFILE_BEGIN',
  FETCH_PROFILE_SUCCESS: 'Auth/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE: 'Auth/FETCH_PROFILE_FAILURE'
};

export const Notification = {
  SHOW: 'Notification/SHOW',
  DISMISS: 'Notification/DISMISS'
};
