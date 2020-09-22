const { BAD_REQUEST } = use('http-status-codes');
const { INTERNAL_ERROR } = use('App/Constants/Errors');

module.exports = {
  error: ({
    response = null,
    error = INTERNAL_ERROR,
    code = BAD_REQUEST,
  }) => response.status(code).send(error),
};
