// @flow

import React, { Component, type Node } from 'react';

type ErrorInfo = {
  componentStack: string,
  componentName: ?string
};

type Props = {
  children: Node
};

type State = {
  error: ?Error,
  errorInfo: ?ErrorInfo
};

class ErrorBoundary extends Component<Props, State> {
  state = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    console.log('Error', error, errorInfo);
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div
          style={{
            background: '#c0392b',
            color: '#fff',
            padding: 20,
            margin: 10
          }}
        >
          <h3>Something went wrong.</h3>
          <pre>
            {__DEV__ && this.state.error && this.state.error.toString()}
            {__DEV__ && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
