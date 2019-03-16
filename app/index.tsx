/// <reference path='./index.d.ts'/>

import '@babel/polyfill';
import 'isomorphic-fetch';

import 'file-loader?name=[name].[ext]!./humans.txt';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from 'app/utils/configureStore';
import createHistory from 'history/createBrowserHistory';
import Root from './Root';

if (__DEV__) {
  (global as any).React = React;
}

const history = createHistory();
const store = configureStore(history);

const rootElement = document.getElementById('root') as HTMLElement;

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
