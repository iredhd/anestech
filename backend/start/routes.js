/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route');

Route.resource('users', 'UserController')
  .validator(new Map([
    [['users.store'], ['StoreUser']],
    [['users.update'], ['UpdateUser']],
  ]))
  .apiOnly()
  .middleware(new Map([
    [['users.index'], ['auth']],
    [['users.update'], ['auth']],
    [['users.destroy'], ['auth']],
    [['users.show'], ['auth']],
  ]));

Route.post('/sessions', 'SessionController.create').validator('AuthUser');

Route.resource('tasks', 'TaskController')
  .validator(new Map([
    [['tasks.store'], ['StoreTask']],
    [['tasks.update'], ['StoreTask']],
    [['tasks.index'], ['FindTask']],
  ]))
  .apiOnly()
  .middleware('auth');
