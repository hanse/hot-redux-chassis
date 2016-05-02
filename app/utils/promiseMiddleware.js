export default function promiseMiddleware() {
  return next => action => {
    if (!action.promise) {
      return next(action);
    }

    const { types, promise, meta, payload } = action;
    const [ PENDING, SUCCESS, FAILURE ] = types;

    if (!Array.isArray(types) || types.length !== 3) {
      throw new TypeError(
        'The `types` field must be an array containing exactly 3 action types.'
      );
    }

    next({
      type: PENDING,
      payload,
      meta
    });

    return new Promise((resolve, reject) => {
      promise.then(
        (payload) => {
          console.info('promiseMiddleware.response', payload);
          resolve(next({
            type: SUCCESS,
            payload,
            meta
          }));
        },
        (error) => {
          console.info('promiseMiddleware.error', error);
          reject(next({
            type: FAILURE,
            error,
            meta
          }));
        }
      );
    });
  };
}
