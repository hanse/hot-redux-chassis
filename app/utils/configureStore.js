/** @flow */

import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';
import { Iterable } from 'immutable';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from './promiseMiddleware';
import errorMiddleware from './errorMiddleware';
import { rootEpic } from '../state';

export default function configureStore(initialState: Object = {}) {
  const middlewares = [
    createEpicMiddleware(rootEpic),
    promiseMiddleware,
    errorMiddleware,
    routerMiddleware(browserHistory)
  ];

  if (__DEV__) {
    const logger = createLogger({
      level: 'info',
      collapsed: true,
      stateTransformer: (state) => Object.keys(state).reduce((json, key) => {
        json[key] = Iterable.isIterable(state[key]) ? state[key].toJS() : state[key];
        return json;
      }, {})
    });

    middlewares.push(logger);
  }

  const store = createStore(
    require('../state').rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
  );

  if (window.devToolsExtension) {
    window.devToolsExtension.updateStore(store);
  }

  if (module.hot) {
    // $FlowIssue
    module.hot.accept('../state', () => {
      const nextReducer = require('../state').rootReducer;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
