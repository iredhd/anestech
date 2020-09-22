module.exports = {
  // USER
  USER_UPDATE_NOT_ALLOWED: {
    code: 100,
    message: 'Atualização de usuário não permitida.',
  },
  USER_DELETE_NOT_ALLOWED: {
    code: 101,
    message: 'Remoção de usuário não permitida.',
  },
  USER_EMAIL_ALREADY_IN_USE: {
    code: 102,
    message: 'Este e-mail já está sendo utilizado por outro usuário.',
  },

  // TASK
  TASK_NOT_FOUND: {
    code: 200,
    message: 'Tarefa não encontrada.',
  },
  TASK_DATETIME_END_BEFORE_START: {
    code: 201,
    message: 'O término não pode ser antes do início da tarefa.',
  },

  // GENERAL
  INTERNAL_ERROR: {
    code: 0,
    message: 'Erro interno, por favor tente novamente mais tarde.',
  },
};
