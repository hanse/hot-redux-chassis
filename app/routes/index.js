// @flow

import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from './toplevel';
import { NotFound } from './errors';

const Dashboard = lazy(() => import('./dashboard'));
const Contact = lazy(() => import('./contact'));
const About = lazy(() => import('./about'));
const Login = lazy(() => import('./login'));
const Search = lazy(() => import('./search'));

type Props = {
  history: any
};

function Router(props: Props) {
  return (
    <ConnectedRouter history={props.history}>
      <App>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
          <Route component={NotFound} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
}

export default Router;
