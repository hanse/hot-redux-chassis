// @flow

import type { Action } from 'app/types';

export function closeSearch(): Action {
  return {
    type: 'CLOSE_SEARCH'
  };
}

export function openSearch(): Action {
  return {
    type: 'OPEN_SEARCH'
  };
}

const initialState = {
  searchOpen: false
};

type State = typeof initialState;

export default function ui(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'OPEN_SEARCH':
      return {
        ...state,
        searchOpen: true
      };

    case 'CLOSE_SEARCH':
      return {
        ...state,
        searchOpen: false
      };

    default:
      return state;
  }
}
