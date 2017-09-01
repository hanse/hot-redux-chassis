// @flow

import type { Observable } from 'rxjs';
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import type { Reducers } from './state';

/**
 * Models
 */

export type SearchResult = string;

export type UserProfile = {
  id: string,
  username: string
};

// Unsplash Photo
export type Post = {
  id: number,
  urls: {
    regular: string
  },
  user: {
    name: string,
    location: string,
    links: {
      html: string
    }
  }
};

export type Notification = {
  id: number,
  message: string
};

/**
 * Redux
 */

export type Action =
  | { type: 'FETCH_PROFILE', payload: { token: string } }
  | { type: 'FETCH_PROFILE_SUCCESS', payload: UserProfile }
  | { type: 'FETCH_PROFILE_FAILURE' }
  | { type: 'LOGIN', payload: { username: string, password: string } }
  | { type: 'LOGIN_SUCCESS', payload: { token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGIN_CLEAR_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'REHYDRATE_AUTH' }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'SHOW_NOTIFICATION', payload: Notification }
  | { type: 'DISMISS_NOTIFICATION', payload: number }
  | { type: 'SEARCH', payload: { query: string } }
  | { type: 'SEARCH_FAILURE', payload: Error, error: boolean }
  | { type: 'CLEAR_SEARCH' }
  | { type: 'OPEN_SEARCH' }
  | { type: 'CLOSE_SEARCH' }
  | { type: 'POSTS_FETCH' }
  | { type: 'POSTS_REFRESH' }
  | {
      type: 'POSTS_RECEIVED',
      payload: { items: Array<Object>, nextPageUrl: string }
    };

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

export type Store = ReduxStore<State, Action>;

export type GetState = () => State;

export type Thunk<A> = (d: Dispatch, gs: GetState) => Promise<void> | void | A;

export type Dispatch = ReduxDispatch<Action> & ((t: Thunk<*>) => Action);

type Dependencies = {};

export type Epic = (
  actions$: Observable<Action>,
  store: Store,
  dependencies: Dependencies
) => Observable<Action>;

// export type ActionObservable = {
//   ofType: <T: string>(type: T) => Observable<any>
// };
