// @flow

import { fromJS, Map } from 'immutable';

type NotificationAction =
    { type: 'SHOW', payload: { id: number, message: string }}
  | { type: 'DISMISS', payload: { id: number }}

let notificationId = 0;
export function showNotification(message: string): NotificationAction {
  return {
    type: 'SHOW',
    payload: {
      id: notificationId++, // impure
      message
    }
  };
}

export function dismissNotification(id: number): NotificationAction {
  return {
    type: 'DISMISS',
    payload: { id }
  };
}

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
  action: NotificationAction
): State {
  switch (action.type) {
    case 'SHOW':
      return state.set(action.payload.id, action.payload);

    case 'DISMISS':
      return state.delete(action.payload.id);

    default:
      return state;
  }
}
