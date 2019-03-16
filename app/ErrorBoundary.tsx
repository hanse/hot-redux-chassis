import React, { Component, ReactNode } from 'react';

type ErrorInfo = {
  componentStack: string;
};

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null | undefined;
  errorInfo: ErrorInfo | null | undefined;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
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
