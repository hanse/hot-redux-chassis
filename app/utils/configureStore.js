// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import { rootEpic } from '../state';
import history from 'history';
import type { Store } from '../types';

export default function configureStore(history: typeof history): Store {
  const middlewares = [
    createEpicMiddleware(rootEpic),
    routerMiddleware(history)
  ];

  if (__DEV__) {
    const logger = createLogger({
      level: 'info',
      collapsed: true,
      stateTransformer: state =>
        Object.keys(state).reduce((json, key) => {
          json[key] = Iterable.isIterable(state[key])
            ? state[key].toJS()
            : state[key];
          return json;
        }, {})
    });

    middlewares.push(logger);
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    require('../state').rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept('../state', () => {
      const nextReducer = require('../state').rootReducer;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
