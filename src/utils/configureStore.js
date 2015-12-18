import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createHashHistory } from 'history';
import { Iterable } from 'immutable';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import routes from '../routes';

export default function configureStore(initialState) {
  const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
    stateTransformer: (state) => Object.keys(state).reduce((json, key) => {
      json[key] = Iterable.isIterable(state[key]) ? state[key].toJS() : state[key];
      return json;
    }, {})
  });

  const middlewares = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  );

  const finalCreateStore = compose(
    middlewares,
    reduxReactRouter({
      routes,
      createHistory: createHashHistory
    })
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
