import { fromJS } from 'immutable';

export function toggleSearch() {
  return {
    type: 'TOGGLE_SEARCH'
  };
}

const initialState = fromJS({
  searchOpen: false
});

export default function ui(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SEARCH':
      return state.set('searchOpen', !state.get('searchOpen'));

    default:
      return state;
  }
}
