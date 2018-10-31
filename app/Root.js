// @flow

// $FlowFixMe React modern
import React, { Component, StrictMode, Suspense } from 'react';
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
        <Suspense fallback={() => null}>
          <Provider {...{ store }}>
            <Router history={history} />
          </Provider>
        </Suspense>
      </StrictMode>
    );
  }
}
