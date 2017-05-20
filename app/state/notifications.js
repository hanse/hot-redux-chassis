// @flow

import { fromJS, Map } from 'immutable';
import type { Action } from 'app/types';

let notificationId = 0;
export function showNotification(message: string): Action {
  return {
    type: 'SHOW_NOTIFICATION',
    payload: {
      id: notificationId++, // impure
      message
    }
  };
}

export function dismissNotification(id: number): Action {
  return {
    type: 'DISMISS_NOTIFICATION',
    payload: { id }
  };
}

function formatActionError(action) {
  if (action.payload && action.payload.message) {
    return action.payload.message;
  }

  return 'Unknown error';
}

export const errorNotificationEpic = (action$: any) =>
  action$
    .filter(action => !!action.error)
    .map(action => showNotification(formatActionError(action)));

/**
 *
 */
type State = Map<number, any>;

/**
 *
 */
const initialState = fromJS({});

/**
 *
 */
export default function notifications(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return state.set(action.payload.id, action.payload);

    case 'DISMISS_NOTIFICATION':
      return state.delete(action.payload.id);

    default:
      return state;
  }
}
