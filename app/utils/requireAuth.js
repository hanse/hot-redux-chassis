// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isLoggedIn } from 'app/state/auth';
import type { Dispatch } from 'app/types';

export default function requireAuth(ProtectedComponent: ReactClass<*>) {
  class AuthenticatedComponent extends Component {
    props: {
      dispatch: Dispatch;
      location: any;
      isLoggedIn: boolean;
    };

    componentWillMount() {
      this.redirectUnlessAuthenticated();
    }

    componentWillReceiveProps() {
      this.redirectUnlessAuthenticated();
    }

    redirectUnlessAuthenticated() {
      if (!this.props.isLoggedIn) {
        const redirectLocation = this.props.location.pathname;
        this.props.dispatch(push(`/login?next=${redirectLocation}`));
      }
    }

    render() {
      if (this.props.isLoggedIn) {
        return <ProtectedComponent {...this.props} />;
      }
      return null;
    }
  }

  return connect((state) => ({
    isLoggedIn: isLoggedIn(state)
  }))(AuthenticatedComponent);
}
