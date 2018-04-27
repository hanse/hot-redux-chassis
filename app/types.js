// @flow

import type {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
  MiddlewareAPI
} from 'redux';
import type { Observable } from 'rxjs';
import type { Reducers } from './state';
import type { Dependencies } from './utils/configureStore';

/**
 * Models
 */

export opaque type ID = string;

export const toId = (value: string | number): ID => {
  if (typeof value === 'number') {
    return value.toString();
  }

  return value;
};

export const idToString = (id: ID): string => String(id);

export type LoginResultDto = {
  token: string
};

export type LoginResult = LoginResultDto;

export type SearchResultDto = string;
export type SearchResult = string;

export type UserProfileDto = {
  id: number,
  username: string
};

export type UserProfile = {
  id: ID,
  username: string
};

// Unsplash Photo
export type PostDto = {
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

// Unsplash photo internal representation
export type Post = {
  id: ID,
  imageUrl: string,
  user: {
    name: string,
    location: string,
    link: string
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
  | { type: 'SEARCH_RESULTS_RECEIVED', payload: Array<SearchResult> }
  | { type: 'SEARCH_RESULT_SELECTED', payload: SearchResult }
  | { type: 'CLEAR_SEARCH' }
  | { type: 'OPEN_SEARCH' }
  | { type: 'CLOSE_SEARCH' }
  | { type: 'POSTS_FETCH' }
  | { type: 'POSTS_REFRESH' }
  | {
      type: 'POSTS_RECEIVED',
      payload: { items: Array<Post>, nextPageUrl: ?string }
    }
  | {
      type: 'POSTS_FETCH_FAILED',
      payload: Error,
      error: true
    };

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

export type Store = ReduxStore<State, Action>;

export type GetState = () => State;

export type Thunk<A> = (d: Dispatch, gs: GetState) => Promise<void> | void | A;

export type Dispatch = ReduxDispatch<Action> & ((t: Thunk<*>) => Action);

export type Epic = (
  actions$: Observable<Action>,
  store: MiddlewareAPI<State, Action>,
  dependencies: Dependencies
) => Observable<Action>;
