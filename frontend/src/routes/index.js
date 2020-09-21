import React from 'react';
import { Switch } from 'react-router-dom';

import { Login, Register, Tasks } from '../pages';
import { PublicRoute, PrivateRoute } from './components';

export default () => (
  <Switch>
    <PublicRoute exact path="/" component={Login} />
    <PublicRoute path="/registrar" component={Register} />
    <PrivateRoute path="/tarefas" component={Tasks} />
  </Switch>
);
