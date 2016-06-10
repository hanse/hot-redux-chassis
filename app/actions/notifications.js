/** @flow */

import { Notification } from './types';
import type { Action } from './types';

let notificationId = 0;
export function showNotification(message: string): Action {
  return {
    type: Notification.SHOW,
    payload: {
      id: notificationId++, // impure
      message
    }
  };
}

export function dismissNotification(id: number): Action {
  return {
    type: Notification.DISMISS,
    payload: { id }
  };
}
