import { Map } from 'immutable';
import { Auth } from 'app/actions/types';

const initialState = Map({
  username: 'Guest',
  token: window.localStorage.getItem('token'),
  failed: false
});

export default function auth(state = initialState, action) {
  switch (action.type) {
    case Auth.LOGIN_BEGIN:
      return state.merge({ failed: false });
    case Auth.LOGIN_FAILURE:
      return state.merge({ failed: true });
    case Auth.LOGIN_SUCCESS:
      return state.merge(action.payload);
    case Auth.LOGOUT:
      return state.merge(initialState);
    case Auth.FETCH_PROFILE_SUCCESS:
      return state.merge(action.payload);
    case Auth.FETCH_PROFILE_FAILURE:
      return state.merge(initialState);
    default:
      return state;
  }
}
