/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Task = use('App/Models/Task');
const Database = use('Database');
const moment = use('moment');

class TaskController {
  async index({ request }) {
    const {
      description, datetimeStart, datetimeEnd, userId,
    } = request.all();

    const query = Database
      .from('tasks');

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
      .paginate(1, 10);
  }

  async store({ request }) {
    const data = request.only(['description', 'datetimeStart', 'datetimeEnd', 'userId']);

    return Task.create(data);
  }

  async show({
    params,
  }) {
    return Task.findOrFail(params.id);
  }

  async update({ request, params }) {
    const data = request.only(['description', 'datetimeStart', 'datetimeEnd']);

    const task = await Task.findOrFail(params.id);

    task.merge(data);

    await task.save();

    return task;
  }

  async destroy({ params }) {
    const task = await Task.findOrFail(params.id);

    return task.delete();
  }
}

module.exports = TaskController;
