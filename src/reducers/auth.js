import { Map } from 'immutable';
import createReducer from '../utils/createReducer';
import { Auth } from '../actions/types';

const initialState = Map({
  username: null,
  token: null,
  failed: false
});

export default createReducer(initialState, {
  [Auth.LOGIN_BEGIN]: state =>
    state.merge({ failed: false }),

  [Auth.LOGIN_FAILURE]: state =>
    state.merge({ failed: true }),

  [Auth.LOGIN_SUCCESS]: (state, action) =>
    state.merge(action.payload),

  [Auth.LOGOUT]: state =>
    state.merge(initialState),

  [Auth.FETCH_PROFILE_SUCCESS]: (state, action) =>
    state.merge(action.payload),

  [Auth.FETCH_PROFILE_FAILURE]: (state) =>
    state.merge(initialState)
});
