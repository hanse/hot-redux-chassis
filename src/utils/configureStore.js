import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createHistory } from 'history';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import routes from '../routes';

export default function configureStore(initialState) {
  const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
  });

  const middlewares = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  );

  const finalCreateStore = compose(
    middlewares,
    reduxReactRouter({ routes, createHistory })
  )(createStore);

  const mergeReducers = (reducers) => combineReducers({
    router: routerStateReducer,
    ...reducers
  });

  const reducer = mergeReducers(require('../reducers'));

  const store = finalCreateStore(reducer, initialState);

  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = mergeReducers(require('../reducers'));
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
