import { createStore, applyMiddleware, compose, Middleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { rootEpic, rootReducer } from '../state';
import * as api from '../services/api';
import * as unsplash from '../services/unsplash';
import { Store, State, Action } from '../types';

const dependencies = {
  api,
  unsplash
};

export type Dependencies = typeof dependencies;

export default function configureStore(history: any): Store {
  const epicMiddleware = createEpicMiddleware({
    dependencies
  });

  const middlewares: Array<Middleware<State, Action>> = [
    epicMiddleware,
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
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store: Store = createStore(
    rootReducer(history),
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    module.hot.accept('../state', () => {
      const nextReducer = require('../state').rootReducer; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  epicMiddleware.run(rootEpic);

  return store;
}
