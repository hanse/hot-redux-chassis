/** @flow */

import React, { PropTypes, Component } from 'react';
import { isLoggedIn } from 'app/reducers/auth';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import type { Dispatch } from 'app/actions/types';

export default function requireAuth(ProtectedComponent: ReactClass) {
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
