// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from './toplevel';
import Dashboard from './dashboard';
import Contact from './contact';
import About from './about';
import Login from './login';
import Search from './search';
import { NotFound } from './errors';

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
