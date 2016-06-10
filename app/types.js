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
