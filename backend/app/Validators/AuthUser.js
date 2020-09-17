class AuthUser {
  get rules() {
    return {
      email: 'required|email|exists:users,email',
      password: 'required',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = AuthUser;
