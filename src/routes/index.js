import React from 'react';
import { IndexRoute, Route } from 'react-router';
import DashboardRoute from '../routes/DashboardRoute';
import AppRoute from '../routes/AppRoute';

export default (
  <Route path='/' component={AppRoute}>
    <IndexRoute component={DashboardRoute} />
  </Route>
);
