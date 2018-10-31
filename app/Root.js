// @flow

import React, { Component, StrictMode, ConcurrentMode } from 'react';
import { Provider } from 'react-redux';
import history from 'history';
import Router from 'app/routes';
import type { Store } from './types';

type Props = {
  store: Store,
  history: typeof history
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <StrictMode>
        <ConcurrentMode>
          <Provider {...{ store }}>
            <Router history={history} />
          </Provider>
        </ConcurrentMode>
      </StrictMode>
    );
  }
}
