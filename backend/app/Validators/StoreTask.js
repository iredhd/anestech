class StoreTask {
  get rules() {
    return {
      description: 'required',
      datetimeStart: 'required|check_datetime_format',
      datetimeEnd: 'required|check_datetime_format',
      userId: 'required|exists:users,id',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = StoreTask;
