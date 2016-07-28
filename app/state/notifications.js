/** @flow */

import { fromJS, Map } from 'immutable';
import type { Action } from 'app/types';

const SHOW = 'Notification/SHOW';
const DISMISS = 'Notification/DISMISS';

let notificationId = 0;
export function showNotification(message: string): Action {
  return {
    type: SHOW,
    payload: {
      id: notificationId++, // impure
      message
    }
  };
}

export function dismissNotification(id: number): Action {
  return {
    type: DISMISS,
    payload: { id }
  };
}

/**
 *
 */
type State = Map<string, any>;

/**
 *
 */
const initialState = fromJS({});

/**
 *
 */
export default function notifications(state: State = initialState, action: Action): State {
  switch (action.type) {
    case SHOW:
      return state.set(action.payload.id, action.payload);

    case DISMISS:
      return state.delete(action.payload.id);

    default:
      return state;
  }
}
