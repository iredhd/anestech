import React from 'react';
import { Switch } from 'react-router-dom';

import {
  Login, Register, Tasks, Task, TaskForm, Users, User, UserForm,
} from '../pages';
import { PublicRoute, PrivateRoute } from './components';

export default () => (
  <Switch>
    <PublicRoute exact path="/" component={Login} />
    <PublicRoute exact path="/registrar" component={Register} />
    <PrivateRoute exact path="/tarefas" component={Tasks} />
    <PrivateRoute path="/tarefas/ver/:id" component={Task} />
    <PrivateRoute path="/tarefas/editar/:id" component={TaskForm} />
    <PrivateRoute path="/tarefas/criar" component={TaskForm} />
    <PrivateRoute exact path="/usuarios" component={Users} />
    <PrivateRoute path="/usuarios/ver/:id" component={User} />
    <PrivateRoute path="/usuarios/editar/:id" component={UserForm} />
    <PrivateRoute path="/usuarios/criar" component={UserForm} />
  </Switch>
);
