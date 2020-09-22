const User = use('App/Models/User');
const Database = use('Database');
const { USER_EMAIL_ALREADY_IN_USE, USER_NOT_FOUND } = use('App/Constants/Errors');
const { error } = use('App/Helpers/Responses');
const { NOT_FOUND } = use('http-status-codes');

class UserController {
  async store({ request, response }) {
    const data = request.only(['name', 'email', 'password']);

    const userExists = await User.findBy('email', data.email);

    if (userExists) {
      return error({ response, error: USER_EMAIL_ALREADY_IN_USE });
    }

    const user = await User.create(data);

    return user;
  }

  async index({ request }) {
    const {
      name, email,
    } = request.all();

    const query = Database
      .from('users');

    if (name) {
      query.where('name', 'like', `%${name}%`);
    }

    if (email) {
      query.where('email', 'like', `%${email}%`);
    }

    return query
      .paginate(1, 10);
  }

  async show({
    params,
    response,
  }) {
    const user = await User.find(params.id);

    if (!user) {
      return error({ response, code: NOT_FOUND, error: USER_NOT_FOUND });
    }

    return user;
  }

  async update({
    request, params, response,
  }) {
    const { password, ...data } = request.only(['name', 'email', 'password']);

    const user = await User.find(params.id);

    if (!user) {
      return error({ response, code: NOT_FOUND, error: USER_NOT_FOUND });
    }

    const diferentUser = await User
      .query()
      .where({ email: data.email })
      .whereNot({ id: params.id })
      .first();

    if (diferentUser) {
      return error({ response, error: USER_EMAIL_ALREADY_IN_USE });
    }

    if (password) {
      data.password = password;
    }

    user.merge(data);

    await user.save();

    return user;
  }

  async destroy({ params, response }) {
    const user = await User.find(params.id);

    if (!user) {
      return error({ response, code: NOT_FOUND, error: USER_NOT_FOUND });
    }

    return user.delete();
  }
}

module.exports = UserController;
