import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './promiseMiddleware';
import errorMiddleware from './errorMiddleware';
import createLogger from 'redux-logger';
import { Iterable } from 'immutable';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(initialState = {}) {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
    stateTransformer: (state) => Object.keys(state).reduce((json, key) => {
      json[key] = Iterable.isIterable(state[key]) ? state[key].toJS() : state[key];
      return json;
    }, {})
  });

  const store = createStore(
    require('../state').default,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        promiseMiddleware,
        errorMiddleware,
        routerMiddleware(browserHistory),
        logger
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    module.hot.accept('../state', () => {
      const nextReducer = require('../state').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
