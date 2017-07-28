// @flow

import { fromJS } from 'immutable';
import type { Action } from 'app/types';

export function closeSearch() {
  return {
    type: 'CLOSE_SEARCH'
  };
}

export function openSearch() {
  return {
    type: 'OPEN_SEARCH'
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
    case 'OPEN_SEARCH':
      return state.set('searchOpen', true);

    case 'CLOSE_SEARCH':
      return state.set('searchOpen', false);

    default:
      return state;
  }
}
