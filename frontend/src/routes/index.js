import React from 'react';
import { Switch } from 'react-router-dom';

import { Login, Register } from '../pages';
import { PublicRoute } from './components';

export default () => (
  <Switch>
    <PublicRoute exact path="/" component={Login} />
    <PublicRoute exact path="/registrar" component={Register} />
  </Switch>
);
