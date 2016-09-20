// @flow

import { Map } from 'immutable';

export type Action = {
  type: string,
  payload?: Object | Error,
  meta?: Object,
  error?: boolean
};

export type RootState = { [key: string]: Map<string, any> };
export type AnyAction = Object & Action;
export type Reducer<T> = (state: T, action: AnyAction) => T;
export type Thunk = (dispatch: Dispatch, getState: () => RootState) => any;
export type Dispatch = (action: Action) => any;
