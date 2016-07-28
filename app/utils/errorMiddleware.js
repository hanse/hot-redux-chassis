/** @flow */

import { showNotification } from 'app/state/notifications';

export default function errorMiddleware(store) {
  return (next) => (action) => {
    if (!action.error) {
      return next(action);
    }

    store.dispatch(showNotification(action.error.message));
    return next(action);
  };
}
