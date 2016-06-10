/** @flow */

import { Map, fromJS } from 'immutable';
import type { Action, RootState, Thunk } from 'app/types';

type AuthActions =
    { type: 'FETCH_PROFILE' }
  | { type: 'FETCH_PROFILE_SUCCESS' }
  | { type: 'FETCH_PROFILE_FAILURE' }

/**
 *
 */
const FETCH_PROFILE = 'Auth/FETCH_PROFILE';
const FETCH_PROFILE_SUCCESS = 'Auth/FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_FAILURE = 'Auth/FETCH_PROFILE_FAILURE';
const LOGIN = 'Auth/LOGIN';
const LOGIN_SUCCESS = 'Auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'Auth/LOGIN_FAILURE';
const LOGOUT = 'Auth/LOGOUT';

export function fetchUserProfile(): Thunk {
  return (dispatch, getState) => {
    const token = getState().auth.get('token');
    if (token === '12345') {
      dispatch({
        type: FETCH_PROFILE_SUCCESS,
        payload: {
          username: 'admin'
        }
      });
    } else {
      window.localStorage.removeItem('token');
      dispatch({
        type: FETCH_PROFILE_FAILURE,
        error: new Error('Invalid token')
      });
    }
  };
}

export function login(username: string, password: string, redirectTo: ?string): Thunk {
  return (dispatch) => {
    dispatch({ type: LOGIN });
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        const token = '12345';
        window.localStorage.setItem('token', token);
        dispatch({ type: LOGIN_SUCCESS, payload: { token, username } });
        dispatch(fetchUserProfile(token));

        if (redirectTo) {
          dispatch(push(redirectTo));
        }
      } else {
        dispatch({ type: LOGIN_FAILURE });
      }
    }, 500);
  };
}

export function logout(): Thunk {
  return (dispatch) => {
    window.localStorage.removeItem('token');
    window.location.reload();
    dispatch({
      type: LOGOUT
    });
  };
}

type State = Map<string, any>;

const initialState = fromJS({
  username: 'Guest',
  token: window.localStorage.getItem('token'),
  failed: false
});

export default function auth(state: State = initialState, action: Action): State {
  switch (action.type) {
    case LOGIN:
      return state.merge({ failed: false });
    case LOGIN_FAILURE:
      return state.merge({ failed: true });
    case LOGIN_SUCCESS:
      return state.merge(action.payload || {});
    case LOGOUT:
      return state.merge(initialState);
    case FETCH_PROFILE_SUCCESS:
      return state.merge(action.payload || {});
    case FETCH_PROFILE_FAILURE:
      return state.merge(initialState);
    default:
      return state;
  }
}

/**
 *
 */
export function isLoggedIn(state: RootState): string {
  return !!state.auth.get('token');
}

/**
 *
 */
export function selectCurrentUsername(state: RootState): string {
  return state.auth.get('username');
}
