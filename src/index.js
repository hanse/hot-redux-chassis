import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import configureStore from './utils/configureStore';

if (__DEV__) {
  global.log = function log(self = this) {
    console.log(self); // eslint-disable-line no-console
    return this;
  };

  global.React = React;
}

const store = configureStore();

render(
  <Provider {...{ store }}>
    <ReduxRouter />
  </Provider>,
  document.getElementById('root')
);
