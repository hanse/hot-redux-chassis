import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
import configureStore from 'app/utils/configureStore';
import routes from 'app/routes';

if (__DEV__) {
  global.log = function log(self = this) {
    console.log(self); // eslint-disable-line no-console
    return this;
  };

  installDevTools(Immutable);

  global.React = React;
}

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider {...{ store }}>
    <Router {...{ history }}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);
