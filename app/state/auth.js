// @flow

import { Observable } from 'rxjs';
import { Map, fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import type { State as RootState, Action } from 'app/types';
import request from 'app/services/restClient';

export function rehydrateAuth(): Action {
  return {
    type: 'REHYDRATE_AUTH'
  };
}

export function fetchUserProfile(token: string): Action {
  return {
    type: 'FETCH_PROFILE',
    payload: { token }
  };
}

export function fetchProfileSuccess(payload: any): Action {
  return {
    type: 'FETCH_PROFILE_SUCCESS',
    payload
  };
}

export function loginSuccess(payload: any): Action {
  return {
    type: 'LOGIN_SUCCESS',
    payload
  };
}

export const loginEpic = (action$: any) =>
  action$.ofType('LOGIN').switchMap(action => {
    const { username, password } = action.payload;
    return request('auth/login', {
      method: 'POST',
      body: {
        username,
        password
      }
    })
      .map(result => result.response)
      .switchMap(payload => {
        window.localStorage.setItem('token', payload.token);
        return Observable.merge(
          Observable.of(loginSuccess(payload)),
          Observable.of(fetchUserProfile(payload.token))
        );
      })
      .catch(error =>
        Observable.of({
          type: 'LOGIN_FAILURE',
          payload: error.xhr.response,
          error: true
        })
      );
  });

export const logoutEpic = (action$: any) =>
  action$.ofType('LOGOUT').switchMap(() => {
    window.localStorage.removeItem('token');
    return Observable.of({
      type: 'LOGOUT_SUCCESS'
    });
  });

export const rehydrateAuthEpic = (action$: any) =>
  action$.ofType('REHYDRATE_AUTH').switchMap(() => {
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
  action$
    .ofType('FETCH_PROFILE')
    .map(action => action.payload.token)
    .switchMap(token =>
      request('auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .map(result => fetchProfileSuccess(result.response))
        .catch(error =>
          Observable.of({
            type: 'FETCH_PROFILE_FAILURE',
            payload: error.xhr.response,
            error: true
          })
        )
    );

export function login(username: string, password: string): Action {
  return {
    type: 'LOGIN',
    payload: {
      username,
      password
    }
  };
}

export function logout(): Action {
  return {
    type: 'LOGOUT'
  };
}

export function clearLoginError(): Action {
  return {
    type: 'LOGIN_CLEAR_ERROR'
  };
}

type State = Map<string, any>;

const initialState = fromJS({
  username: 'Guest',
  token: null,
  failed: false
});

export default function auth(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'LOGIN':
    case LOCATION_CHANGE:
    case 'LOGIN_CLEAR_ERROR':
      return state.merge({ failed: false });

    case 'LOGIN_FAILURE':
      return state.merge({ failed: true });

    case 'LOGIN_SUCCESS':
      return state.merge({
        token: action.payload.token
      });

    case 'LOGOUT':
      return state.merge(initialState);

    case 'FETCH_PROFILE_SUCCESS':
      return state.merge(action.payload || {});

    case 'FETCH_PROFILE_FAILURE':
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
