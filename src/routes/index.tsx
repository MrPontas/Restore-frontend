import React from 'react';
import { Switch } from 'react-router-dom';
// import Route from './Route';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Report from '../pages/Report';
import Recover from '../pages/Recover';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/report" component={Report} isPrivate />
    <Route path="/recover/:token" component={Recover} />
  </Switch>
);

export default Routes;
