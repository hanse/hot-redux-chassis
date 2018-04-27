// @flow

import { createStore, applyMiddleware, compose, type Middleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { rootEpic } from '../state';
import * as api from '../services/api';
import * as unsplash from '../services/unsplash';
import type { Store, State, Action } from '../types';

const dependencies = {
  api,
  unsplash
};

export type Dependencies = typeof dependencies;

export default function configureStore(history: *): Store {
  const middlewares: Array<Middleware<State, Action>> = [
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
  const store: Store = createStore(
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
