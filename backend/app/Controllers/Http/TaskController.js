/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Task = use('App/Models/Task');
const Database = use('Database');
const moment = use('moment');
const { NOT_FOUND } = use('http-status-codes');
const { TASK_NOT_FOUND, TASK_DATETIME_END_BEFORE_START } = use('App/Constants/Errors');
const { error } = use('App/Helpers/Responses');

class TaskController {
  async index({ request }) {
    const {
      description, datetimeStart, datetimeEnd, userId, page = 1,
    } = request.all();

    const query = Database
      .select('tasks.*')
      .select('users.name', 'name')
      .from('tasks')
      .innerJoin('users', 'users.id', 'tasks.userId');

    if (userId) {
      query.where('userId', userId);
    }

    if (datetimeStart) {
      query.whereBetween('datetimeStart', [
        moment(datetimeStart).format('YYYY-MM-DD 00:00:00'),
        moment(datetimeStart).format('YYYY-MM-DD 23:59:59'),
      ]);
    }

    if (datetimeEnd) {
      query.whereBetween('datetimeEnd', [
        moment(datetimeEnd).format('YYYY-MM-DD 00:00:00'),
        moment(datetimeEnd).format('YYYY-MM-DD 23:59:59'),
      ]);
    }

    if (description) {
      query.where('description', 'like', `%${description}%`);
    }

    return query
      .paginate(page, 10);
  }

  async store({ request, response }) {
    const {
      description, datetimeStart, datetimeEnd = null, userId,
    } = request.all();

    if (datetimeEnd) {
      if (moment(datetimeEnd).isBefore(datetimeStart)) {
        return error({ response, error: TASK_DATETIME_END_BEFORE_START });
      }
    }

    return Task.create({
      description, datetimeStart, datetimeEnd, userId,
    });
  }

  async show({
    params,
    response,
  }) {
    const task = await Task.find(params.id);

    if (!task) {
      return error({ response, code: NOT_FOUND, error: TASK_NOT_FOUND });
    }

    await task.load('user');

    return task;
  }

  async update({ request, params, response }) {
    const {
      description, datetimeStart, datetimeEnd = null, userId,
    } = request.all();

    const task = await Task.find(params.id);

    if (!task) {
      return error({ response, code: NOT_FOUND, error: TASK_NOT_FOUND });
    }

    if (datetimeEnd) {
      if (moment(datetimeEnd).isBefore(datetimeStart)) {
        return error({ response, error: TASK_DATETIME_END_BEFORE_START });
      }
    }

    task.merge({
      description, datetimeStart, datetimeEnd, userId,
    });

    await task.save();

    return Task.find(params.id);
  }

  async destroy({ params, response }) {
    const task = await Task.find(params.id);

    if (!task) {
      return error({ response, code: NOT_FOUND, error: TASK_NOT_FOUND });
    }

    return task.delete();
  }
}

module.exports = TaskController;
