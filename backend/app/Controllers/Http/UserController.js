const User = use('App/Models/User');
const Database = use('Database');
const { BAD_REQUEST } = use('http-status-codes');
const { USER_UPDATE_NOT_ALLOWED, USER_EMAIL_ALREADY_IN_USE, USER_DELETE_NOT_ALLOWED } = use('App/Constants/Errors');

class UserController {
  async store({ request }) {
    const data = request.only(['name', 'email', 'password']);

    const user = await User.create(data);

    return user;
  }

  async index({ request }) {
    const {
      name,
    } = request.all();

    const query = Database
      .from('users');

    if (name) {
      query.where('name', 'like', `%${name}%`);
    }

    return query
      .paginate(1, 10);
  }

  async show({
    params,
  }) {
    return User.findOrFail(params.id);
  }

  async update({
    request, params, auth, response,
  }) {
    const { password, ...data } = request.only(['name', 'email', 'password']);

    if (Number(auth.user.id) !== Number(params.id)) {
      return response.status(BAD_REQUEST).send({ error: USER_UPDATE_NOT_ALLOWED });
    }

    const diferentUser = await User
      .query()
      .where({ email: data.email })
      .whereNot({ id: params.id })
      .first();

    if (diferentUser) {
      return response.status(BAD_REQUEST).send({ error: USER_EMAIL_ALREADY_IN_USE });
    }

    const user = await User.findOrFail(params.id);

    if (password) {
      data.password = password;
    }

    user.merge(data);

    await user.save();

    return user;
  }

  async destroy({ params, response, auth }) {
    if (Number(auth.user.id) !== Number(params.id)) {
      return response.status(BAD_REQUEST).send({ error: USER_DELETE_NOT_ALLOWED });
    }

    const user = await User.findOrFail(params.id);

    return user.delete();
  }
}

module.exports = UserController;
