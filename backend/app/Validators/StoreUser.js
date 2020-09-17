class StoreUser {
  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = StoreUser;
