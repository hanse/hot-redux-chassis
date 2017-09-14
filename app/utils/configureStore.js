// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import history from 'history';
import { rootEpic } from '../state';
import * as api from '../services/api';
import * as unsplash from '../services/unsplash';
import type { Store } from '../types';

const dependencies = {
  api,
  unsplash
};

export type Dependencies = typeof dependencies;

export default function configureStore(history: typeof history): Store {
  const middlewares = [
    createEpicMiddleware(rootEpic, {
      dependencies
    }),
    routerMiddleware(history)
  ];

  if (__DEV__) {
    const logger = createLogger({
      level: 'info',
      collapsed: true
    });

    middlewares.push(logger);
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    require('../state').rootReducer, // eslint-disable-line
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept('../state', () => {
      const nextReducer = require('../state').rootReducer; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
