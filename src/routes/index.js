import React from 'react';
import { IndexRoute, Route } from 'react-router';
import DashboardRoute from '../routes/DashboardRoute';
import RootRoute from '../routes/RootRoute';

export default (
  <Route path='/' component={RootRoute}>
    <IndexRoute component={DashboardRoute} />
  </Route>
);
