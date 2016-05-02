import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { Iterable } from 'immutable';
import { routerReducer } from 'react-router-redux';

export default function configureStore(initialState = {}) {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
    stateTransformer: (state) => Object.keys(state).reduce((json, key) => {
      json[key] = Iterable.isIterable(state[key]) ? state[key].toJS() : state[key];
      return json;
    }, {})
  });

  const mergeReducers = (reducers) => combineReducers({
    ...reducers,
    routing: routerReducer
  });

  const store = createStore(
    mergeReducers(require('../reducers')),
    initialState,
    compose(
      applyMiddleware(thunk, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = mergeReducers(require('../reducers'));
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
