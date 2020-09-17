class UpdateUser {
  get rules() {
    return {
      name: 'required',
      email: 'required|email',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = UpdateUser;
