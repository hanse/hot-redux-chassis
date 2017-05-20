// @flow

import { fromJS } from 'immutable';
import type { Action } from 'app/types';

export function toggleSearch(): Action {
  return {
    type: 'TOGGLE_SEARCH'
  };
}

const initialState = fromJS({
  searchOpen: false
});

export default function ui(
  state: typeof initialState = initialState,
  action: Action
) {
  switch (action.type) {
    case 'TOGGLE_SEARCH':
      return state.set('searchOpen', !state.get('searchOpen'));

    default:
      return state;
  }
}
