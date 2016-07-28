/** @flow */

import { Map, fromJS } from 'immutable';
import { push } from 'react-router-redux';
import type { Action, RootState, Thunk } from 'app/types';
import fetchJSON from 'app/utils/fetchJSON';

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

export function rehydrateAuth(): Thunk {
  return (dispatch) => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    return dispatch(fetchUserProfile(token)).then((action) => {
      return dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          json: { token }
        }
      });
    });
  };
}

export function fetchUserProfile(token: string): Thunk {
  return {
    types: [FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE],
    promise: fetchJSON(`http://localhost:3000/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  };
}

export function login(username: string, password: string, redirectTo: ?string): Thunk {
  return (dispatch) => {
    return dispatch({
      types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE],
      promise: fetchJSON('http://localhost:3000/auth/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        })
      })
    }).then((action) => {
      window.localStorage.setItem('token', action.payload.json.token);
      dispatch(fetchUserProfile(action.payload.json.token));

      if (redirectTo) {
        dispatch(push(redirectTo));
      }
      return action;
    });
  };
}

export function logout(): Thunk {
  return (dispatch) => {
    window.localStorage.removeItem('token');
    window.location.reload();
    return dispatch({
      type: LOGOUT
    });
  };
}

type State = Map<string, any>;

const initialState = fromJS({
  username: 'Guest',
  token: null,
  failed: false
});

export default function auth(state: State = initialState, action: Action): State {
  switch (action.type) {
    case LOGIN:
      return state.merge({ failed: false });

    case LOGIN_FAILURE:
      return state.merge({ failed: true });

    case LOGIN_SUCCESS:
      return state.merge({
        token: action.payload.json.token
      });

    case LOGOUT:
      return state.merge(initialState);

    case FETCH_PROFILE_SUCCESS:
      return state.merge(action.payload.json || {});

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
