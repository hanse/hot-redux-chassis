export default function promiseMiddleware() {
  return next => action => {
    if (!action.promise) {
      return next(action);
    }

    const { types, promise, meta, payload } = action;

    if (!Array.isArray(types) || types.length !== 3) {
      throw new TypeError(
        'The `types` field must be an array containing exactly 3 action types.'
      );
    }

    const [PENDING, SUCCESS, FAILURE] = types;

    next({
      type: PENDING,
      payload,
      meta
    });

    return new Promise((resolve, reject) => {
      promise.then(
        (payload) => {
          __DEV__ && console.info('promiseMiddleware.resolved', payload); // eslint-disable-line
          resolve(next({
            type: SUCCESS,
            payload,
            meta
          }));
        },
        (error) => {
          __DEV__ && console.info('promiseMiddleware.rejected', error); // eslint-disable-line
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
