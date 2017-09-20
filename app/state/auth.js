// @flow

import { Observable } from 'rxjs';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toId } from 'app/types';
import type {
  State as RootState,
  Action,
  UserProfile,
  UserProfileDto,
  LoginResult,
  LoginResultDto,
  Epic
} from 'app/types';

function mapUserProfileDto(userProfile: UserProfileDto): UserProfile {
  const { id, ...rest } = userProfile;
  return {
    ...rest,
    id: toId(id)
  };
}

function mapLoginResultDto(loginResult: LoginResultDto): LoginResult {
  return loginResult;
}

export function rehydrateAuth(): Action {
  return {
    type: 'REHYDRATE_AUTH'
  };
}

export function fetchUserProfile(token: string) {
  return {
    type: 'FETCH_PROFILE',
    payload: { token }
  };
}

export function fetchProfileSuccess(userProfile: UserProfile) {
  return {
    type: 'FETCH_PROFILE_SUCCESS',
    payload: userProfile
  };
}

export function fetchProfileFailure(error: Error) {
  return {
    type: 'FETCH_PROFILE_FAILURE',
    payload: error,
    error: true
  };
}

export function login(username: string, password: string) {
  return {
    type: 'LOGIN',
    payload: {
      username,
      password
    }
  };
}

export function loginSuccess(payload: LoginResult) {
  return {
    type: 'LOGIN_SUCCESS',
    payload
  };
}

export function loginFailure(error: Error) {
  return {
    type: 'LOGIN_FAILURE',
    payload: error,
    error: true
  };
}

export function logout() {
  return {
    type: 'LOGOUT'
  };
}

export function logoutSuccess() {
  return {
    type: 'LOGOUT_SUCCESS'
  };
}

export function clearLoginError() {
  return {
    type: 'LOGIN_CLEAR_ERROR'
  };
}

export const loginEpic: Epic = (action$, store, { api }) =>
  action$.filter(action => action.type === 'LOGIN').switchMap(action => {
    if (action.type !== 'LOGIN') throw new Error();
    const { username, password } = action.payload;
    return api
      .login(username, password)
      .switchMap(payload => {
        window.localStorage.setItem('token', payload.token);
        return Observable.merge(
          Observable.of(loginSuccess(mapLoginResultDto(payload))),
          Observable.of(fetchUserProfile(payload.token))
        );
      })
      .catch((error: Error) => Observable.of(loginFailure(error)));
  });

export const logoutEpic: Epic = action$ =>
  action$.filter(action => action.type === 'LOGOUT').switchMap(() => {
    window.localStorage.removeItem('token');
    return Observable.of(logoutSuccess());
  });

export const rehydrateAuthEpic: Epic = action$ =>
  action$.filter(action => action.type === 'REHYDRATE_AUTH').switchMap(() => {
    const token: string = window.localStorage.getItem('token');
    if (!token) {
      return Observable.of();
    }

    return Observable.merge(
      Observable.of(loginSuccess({ token })),
      Observable.of(fetchUserProfile(token))
    );
  });

export const fetchProfileEpic: Epic = (action$, store, { api }) =>
  action$
    .filter(action => action.type === 'FETCH_PROFILE')
    .switchMap(action => {
      if (action.type !== 'FETCH_PROFILE') throw new Error();
      const token = action.payload.token;
      return api
        .fetchProfile(token)
        .map(userProfile => fetchProfileSuccess(mapUserProfileDto(userProfile)))
        .catch((error: Error) => Observable.of(fetchProfileFailure(error)));
    });

const initialState = {
  username: 'Guest',
  token: null,
  failed: false
};

type State = {
  username: string,
  token: ?string,
  failed: boolean
};

export default function auth(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'LOGIN':
    case LOCATION_CHANGE:
    case 'LOGIN_CLEAR_ERROR':
      return {
        ...state,
        failed: false
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        failed: true
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token
      };

    case 'LOGOUT':
      return initialState;

    case 'FETCH_PROFILE_SUCCESS':
      return {
        ...state,
        ...action.payload
      };

    case 'FETCH_PROFILE_FAILURE':
      return initialState;

    default:
      return state;
  }
}

export function isLoggedIn(state: RootState): boolean {
  return !!state.auth.token;
}

export function selectCurrentUsername(state: RootState): string {
  return state.auth.username;
}
