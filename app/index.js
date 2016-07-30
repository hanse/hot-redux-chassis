/** @flow */

import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'app/utils/configureStore';
import Root from './Root';

global.log = function log(self = this) {
  console.log(self); // eslint-disable-line no-console
  return this;
};

if (__DEV__) {
  global.React = React;
}

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const rootElement = document.getElementById('root');

render(
  <AppContainer>
    <Root {...{ store, history }} />
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    render(
      <AppContainer>
        <Root {...{ store, history }} />
      </AppContainer>,
      rootElement
    );
  });
}
