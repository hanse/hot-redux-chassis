// @flow

import React from 'react';
import ReactLoadable from 'react-loadable';
import ErrorBoundary from 'app/ErrorBoundary';

const Loadable = (props: any) =>
  ReactLoadable({
    loading: () => null,
    delay: 200,
    render(loaded, props) {
      const Component = loaded.default;
      return (
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>
      );
    },
    ...props
  });

export default Loadable;
