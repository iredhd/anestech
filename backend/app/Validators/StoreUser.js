class StoreUser {
  get rules() {
    return {
      name: 'required',
      email: 'required|email',
      password: 'required',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = StoreUser;
