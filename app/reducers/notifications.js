import { fromJS } from 'immutable';
import { Notification } from 'app/actions/types';

const initialState = fromJS({});

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case Notification.SHOW:
      return state.set(action.payload.id, action.payload);

    case Notification.DISMISS:
      return state.delete(action.payload.id);

    default:
      return state;
  }
}
