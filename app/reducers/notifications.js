/** @flow */

import { fromJS, Map } from 'immutable';
import { Notification } from 'app/actions/types';
import type { Action } from 'app/actions/types';

type State = Map;

const initialState = fromJS({});

export default function notifications(state: State = initialState, action: Action): State {
  switch (action.type) {
    case Notification.SHOW:
      return state.set(action.payload.id, action.payload);

    case Notification.DISMISS:
      return state.delete(action.payload.id);

    default:
      return state;
  }
}
