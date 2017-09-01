// @flow

import type { Action, Notification, Epic } from 'app/types';

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
    payload: id
  };
}

function formatActionError(action: Action): string {
  if (action.payload && action.payload.message) {
    const error: Error = (action.payload: any);
    return error.message;
  }

  return 'Unknown error';
}

export const errorNotificationEpic: Epic = action$ =>
  action$
    .filter(action => (action.error ? !!action.error : false))
    .map(action => showNotification(formatActionError(action)));

/**
 *
 */
type State = { [key: string]: Notification };

/**
 *
 */
const initialState = {};

/**
 *
 */
export default function notifications(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        [action.payload.id]: action.payload
      };

    case 'DISMISS_NOTIFICATION': {
      const nextState = { ...state };
      delete nextState[action.payload];
      return nextState;
    }

    default:
      return state;
  }
}
