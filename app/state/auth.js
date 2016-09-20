/** @flow */

import { Observable } from 'rxjs';
import { Map, fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import type { Action, RootState } from 'app/types';
import request from 'app/services/restClient';

/**
 *
 */
const FETCH_PROFILE = 'Auth/FETCH_PROFILE';
const FETCH_PROFILE_SUCCESS = 'Auth/FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_FAILURE = 'Auth/FETCH_PROFILE_FAILURE';
const LOGIN = 'Auth/LOGIN';
const LOGIN_SUCCESS = 'Auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'Auth/LOGIN_FAILURE';
const LOGIN_CLEAR_ERROR = 'Auth/LOGIN_CLEAR_ERROR';
const LOGOUT = 'Auth/LOGOUT';
const REHYDRATE_AUTH = 'Auth/REHYDRATE_AUTH';

export function rehydrateAuth() {
  return {
    type: REHYDRATE_AUTH
  };
}

export function fetchUserProfile(token: string) {
  return {
    type: FETCH_PROFILE,
    payload: { token }
  };
}

export function fetchProfileSuccess(payload: any) {
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload
  };
}

export function loginSuccess(payload: any) {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
}

export const loginEpic = (action$: any) =>
  action$.ofType(LOGIN)
    .map((action) => action.payload)
    .switchMap(({ username, password }) => {
      return request('auth/login', {
        method: 'POST',
        body: {
          username,
          password
        }
      })
        .map((result) => result.response)
        .switchMap((payload) => {
          window.localStorage.setItem('token', payload.token);
          return Observable.merge(
            Observable.of(loginSuccess(payload)),
            Observable.of(fetchUserProfile(payload.token))
          );
        })
        .catch((error) => Observable.of({
          type: LOGIN_FAILURE,
          payload: error.xhr.response,
          error: true
        }));
    });

export const logoutEpic = (action$: any) =>
  action$.ofType(LOGOUT)
    .switchMap(() => {
      window.localStorage.removeItem('token');
      return Observable.of({
        type: 'LOGOUT_SUCCESS'
      });
    });

export const rehydrateAuthEpic = (action$: any) =>
  action$.ofType(REHYDRATE_AUTH)
    .switchMap(() => {
      const token = window.localStorage.getItem('token');
      if (!token) {
        return Observable.of();
      }

      return Observable.merge(
        Observable.of(loginSuccess({ token })),
        Observable.of(fetchUserProfile(token))
      );
    });

export const fetchProfileEpic = (action$: any) =>
  action$.ofType(FETCH_PROFILE)
    .map((action) => action.payload.token)
    .switchMap((token) =>
      request('auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).map((result) => fetchProfileSuccess(result.response))
        .catch((error) => Observable.of({
          type: FETCH_PROFILE_FAILURE,
          payload: error.xhr.response,
          error: true
        }))
    );

export function login(username: string, password: string) {
  return {
    type: LOGIN,
    payload: {
      username,
      password
    }
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function clearLoginError() {
  return {
    type: LOGIN_CLEAR_ERROR
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
    case LOCATION_CHANGE:
    case LOGIN_CLEAR_ERROR:
      return state.merge({ failed: false });

    case LOGIN_FAILURE:
      return state.merge({ failed: true });

    case LOGIN_SUCCESS:
      return state.merge({
        token: action.payload.token
      });

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
