/** @flow */

import { Map, fromJS } from 'immutable';
import { Auth } from 'app/actions/types';
import type { Action, RootState } from 'app/actions/types';

type State = Map<string, any>;

const initialState = fromJS({
  username: 'Guest',
  token: window.localStorage.getItem('token'),
  failed: false
});

export default function auth(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Auth.LOGIN_BEGIN:
      return state.merge({ failed: false });
    case Auth.LOGIN_FAILURE:
      return state.merge({ failed: true });
    case Auth.LOGIN_SUCCESS:
      return state.merge(action.payload || {});
    case Auth.LOGOUT:
      return state.merge(initialState);
    case Auth.FETCH_PROFILE_SUCCESS:
      return state.merge(action.payload || {});
    case Auth.FETCH_PROFILE_FAILURE:
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
