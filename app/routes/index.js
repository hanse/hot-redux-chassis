// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import AppRoute from './app/AppRoute';
import Dashboard from './dashboard';
import Contact from './contact';
import About from './about';
import Login from './login';
import { NotFound } from './errors';

export default ({ history }: any) =>
  <ConnectedRouter history={history}>
    <AppRoute>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </AppRoute>
  </ConnectedRouter>;
