// @flow

import 'babel-polyfill';
import 'isomorphic-fetch';

// $FlowIssue
import '!file-loader?name=[name].[ext]!./manifest.json';

// $FlowIssue
import 'file-loader?name=[name].[ext]!./humans.txt';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'app/utils/configureStore';
import createHistory from 'history/createBrowserHistory';
import Root from './Root';

global.log = function log(self = this) {
  console.log(self); // eslint-disable-line no-console
  return this;
};

if (__DEV__) {
  global.React = React;
}

const history = createHistory();
const store = configureStore(history);

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
