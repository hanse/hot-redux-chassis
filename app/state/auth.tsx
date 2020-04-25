import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType } from 'redux-observable';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  State as RootState,
  Action,
  UserProfile,
  LoginResult,
  Epic,
} from 'app/types';

export function rehydrateAuth(): Action {
  return {
    type: 'REHYDRATE_AUTH',
  };
}

export function fetchUserProfile(token: string): Action {
  return {
    type: 'FETCH_PROFILE',
    payload: { token },
  };
}

export function fetchProfileSuccess(userProfile: UserProfile): Action {
  return {
    type: 'FETCH_PROFILE_SUCCESS',
    payload: userProfile,
  };
}

export function fetchProfileFailure(error: Error): Action {
  return {
    type: 'FETCH_PROFILE_FAILURE',
    payload: error,
    error: true,
  };
}

export function login(username: string, password: string): Action {
  return {
    type: 'LOGIN',
    payload: {
      username,
      password,
    },
  };
}

export function loginSuccess(payload: LoginResult): Action {
  return {
    type: 'LOGIN_SUCCESS',
    payload,
  };
}

export function loginFailure(error: Error): Action {
  return {
    type: 'LOGIN_FAILURE',
    payload: error,
    error: true,
  };
}

export function logout(): Action {
  return {
    type: 'LOGOUT',
  };
}

export function logoutSuccess(): Action {
  return {
    type: 'LOGOUT_SUCCESS',
  };
}

export function clearLoginError(): Action {
  return {
    type: 'LOGIN_CLEAR_ERROR',
  };
}

export const loginEpic: Epic = (action$, store, { api }) =>
  action$.pipe(
    ofType('LOGIN'),
    map((action) => action.payload),
    switchMap(({ username, password }) =>
      api.login(username, password).pipe(
        switchMap((payload) => {
          window.localStorage.setItem('token', payload.token);
          return of(loginSuccess(payload), fetchUserProfile(payload.token));
        }),
        catchError((error: Error) => of(loginFailure(error)))
      )
    )
  );

export const logoutEpic: Epic = (action$) =>
  action$.pipe(
    ofType('LOGOUT'),
    switchMap(() => {
      window.localStorage.removeItem('token');
      return of(logoutSuccess());
    })
  );

export const rehydrateAuthEpic: Epic = (action$) =>
  action$.pipe(
    ofType('REHYDRATE_AUTH'),
    switchMap(() => {
      const token = window.localStorage.getItem('token');
      if (!token) {
        return of();
      }

      return of(loginSuccess({ token }), fetchUserProfile(token));
    })
  );

export const fetchProfileEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    ofType('FETCH_PROFILE'),
    switchMap((action: Extract<Action, { type: 'FETCH_PROFILE' }>) => {
      const { token } = action.payload;
      return api.fetchProfile(token).pipe(
        map((userProfile) => fetchProfileSuccess(userProfile)),
        catchError((error: Error) => of(fetchProfileFailure(error)))
      );
    })
  );

const initialState = {
  username: 'Guest',
  token: null,
  failed: false,
};

type State = {
  username: string;
  token: string | null | undefined;
  failed: boolean;
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
        failed: false,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        failed: true,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        token: action.payload.token,
      };

    case 'LOGOUT':
      return initialState;

    case 'FETCH_PROFILE_SUCCESS':
      return {
        ...state,
        ...action.payload,
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
