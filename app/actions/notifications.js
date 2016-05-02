import { Notification } from './types';

let notificationId = 0;
export function showNotification(message) {
  return {
    type: Notification.SHOW,
    payload: {
      id: notificationId++, // impure
      message
    }
  };
}

export function dismissNotification(id) {
  return {
    type: Notification.DISMISS,
    payload: { id }
  };
}
