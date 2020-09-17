class FindTask {
  get rules() {
    return {
      datetimeStart: 'date',
      datetimeEnd: 'date',
      userId: 'exists:users,id',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = FindTask;
