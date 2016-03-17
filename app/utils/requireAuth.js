import React, { PropTypes, Component } from 'react';
import { stateSelector } from 'app/reducers/auth';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function requireAuth(ProtectedComponent) {
  class AuthenticatedComponent extends Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      location: PropTypes.object.isRequired,
      isLoggedIn: PropTypes.bool.isRequired
    }

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

  return connect(state => ({
    ...stateSelector(state.auth)
  }))(AuthenticatedComponent);
}
