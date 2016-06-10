/** @flow */

import { Auth } from 'app/actions/types';
import { push } from 'react-router-redux';
import type { Thunk } from 'app/actions/types';

export function fetchUserProfile(): Thunk {
  return (dispatch, getState) => {
    const token = getState().auth.get('token');
    if (token === '12345') {
      dispatch({
        type: Auth.FETCH_PROFILE_SUCCESS,
        payload: {
          username: 'admin'
        }
      });
    } else {
      window.localStorage.removeItem('token');
      dispatch({
        type: Auth.FETCH_PROFILE_FAILURE,
        error: new Error('Invalid token')
      });
    }
  };
}

export function login(username: string, password: string, redirectTo: ?string): Thunk {
  return (dispatch) => {
    dispatch({ type: Auth.LOGIN_BEGIN });
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        const token = '12345';
        window.localStorage.setItem('token', token);
        dispatch({ type: Auth.LOGIN_SUCCESS, payload: { token, username } });
        dispatch(fetchUserProfile(token));

        if (redirectTo) {
          dispatch(push(redirectTo));
        }
      } else {
        dispatch({ type: Auth.LOGIN_FAILURE });
      }
    }, 500);
  };
}

export function logout(): Thunk {
  return (dispatch) => {
    window.localStorage.removeItem('token');
    window.location.reload();
    dispatch({
      type: Auth.LOGOUT
    });
  };
}
