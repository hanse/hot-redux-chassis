import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
import configureStore from 'app/utils/configureStore';
import Root from './Root';

global.log = function log(self = this) {
  console.log(self); // eslint-disable-line no-console
  return this;
};

if (__DEV__) {
  installDevTools(Immutable);
  global.React = React;
}

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

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
