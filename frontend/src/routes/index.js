import React from 'react';
import { Switch } from 'react-router-dom';

import { Login, Register, Home } from '../pages';
import { PublicRoute, PrivateRoute } from './components';

export default () => (
  <Switch>
    <PublicRoute exact path="/" component={Login} />
    <PublicRoute path="/registrar" component={Register} />
    <PrivateRoute path="/home" component={Home} />
  </Switch>
);
