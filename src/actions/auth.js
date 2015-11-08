import { Auth } from './types';

export function login(username, password) {
  return (dispatch) => {
    dispatch({ type: Auth.LOGIN_BEGIN });
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        dispatch({ type: Auth.LOGIN_SUCCESS, payload: { token: '12345', username } });
      } else {
        dispatch({ type: Auth.LOGIN_FAILURE });
      }
    }, 750);
  };
}

export function logout() {
  return {
    type: Auth.LOGOUT
  };
}
