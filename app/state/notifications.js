// @flow

import { fromJS, Map } from 'immutable';

type NotificationAction =
    { type: 'SHOW_NOTIFICATION', payload: { id: number, message: string }}
  | { type: 'DISMISS_NOTIFICATION', payload: { id: number }}

let notificationId = 0;
export function showNotification(message: string): NotificationAction {
  return {
    type: 'SHOW_NOTIFICATION',
    payload: {
      id: notificationId++, // impure
      message
    }
  };
}

export function dismissNotification(id: number): NotificationAction {
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
  action$.filter((action) => !!action.error)
    .map((action) => showNotification(formatActionError(action)));

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
    case 'SHOW_NOTIFICATION':
      return state.set(action.payload.id, action.payload);

    case 'DISMISS_NOTIFICATION':
      return state.delete(action.payload.id);

    default:
      return state;
  }
}
