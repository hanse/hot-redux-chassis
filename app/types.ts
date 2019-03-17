import { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux';
import { Epic as _Epic } from 'redux-observable';
import { Reducers } from './state';
import { Dependencies } from './configureStore';
import { LOCATION_CHANGE } from 'connected-react-router';

/**
 * Models
 */

export type ID = string;

export const toId = (value: string | number): ID => {
  if (typeof value === 'number') {
    return value.toString();
  }

  return value;
};

export const idToString = (id: ID): string => String(id);

export type LoginResultDto = {
  token: string;
};

export type LoginResult = LoginResultDto;

export type SearchResultDto = string;
export type SearchResult = string;

export type UserProfileDto = {
  id: number;
  username: string;
};

export type UserProfile = {
  id: ID;
  username: string;
};

// Unsplash Photo
export type PostDto = {
  id: number;
  urls: {
    regular: string;
  };
  user: {
    name: string;
    location: string;
    links: {
      html: string;
    };
  };
};

// Unsplash photo internal representation
export type Post = {
  id: ID;
  imageUrl: string;
  user: {
    name: string;
    location: string;
    link: string;
  };
};

export type Notification = {
  id: number;
  message: string;
};

/**
 * Redux
 */

export type Action =
  | { type: 'FETCH_PROFILE'; payload: { token: string } }
  | { type: 'FETCH_PROFILE_SUCCESS'; payload: UserProfile }
  | { type: 'FETCH_PROFILE_FAILURE' }
  | { type: 'LOGIN'; payload: { username: string; password: string } }
  | { type: 'LOGIN_SUCCESS'; payload: { token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGIN_CLEAR_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'LOGOUT_SUCCESS' }
  | { type: 'REHYDRATE_AUTH' }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'SHOW_NOTIFICATION'; payload: Notification }
  | { type: 'DISMISS_NOTIFICATION'; payload: number }
  | { type: 'SEARCH'; payload: { query: string } }
  | { type: 'SEARCH_FAILURE'; payload: Error; error: boolean }
  | { type: 'SEARCH_RESULTS_RECEIVED'; payload: Array<SearchResult> }
  | { type: 'SEARCH_RESULT_SELECTED'; payload: SearchResult }
  | { type: 'CLEAR_SEARCH' }
  | { type: 'OPEN_SEARCH' }
  | { type: 'CLOSE_SEARCH' }
  | { type: 'POSTS_FETCH' }
  | { type: 'POSTS_REFRESH' }
  | { type: typeof LOCATION_CHANGE }
  | {
      type: 'POSTS_RECEIVED';
      payload: { items: Array<Post>; nextPageUrl: string | null | undefined };
    }
  | {
      type: 'POSTS_FETCH_FAILED';
      payload: Error;
      error: true;
    };

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

export type State = { [key in keyof Reducers]: ReturnType<Reducers[key]> };

export type Store = ReduxStore<State, Action>;

export type Dispatch = ReduxDispatch<Action>;

export type Epic = _Epic<any, any, State, Dependencies>;
