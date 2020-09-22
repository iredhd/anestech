const Validator = use('Validator');
const Database = use('Database');
const moment = use('moment');

const existsFn = async (data, field, message, args, get) => {
  const value = get(data, field);
  const [table, column] = args;

  if (!value) {
    return;
  }

  const row = await Database.table(table).where(column, value).first();

  if (!row) {
    throw message;
  }
};

Validator.extend('exists', existsFn);

const checkDatetimeFormat = async (data, field, message, args, get) => {
  const value = get(data, field);

  if (!value) {
    return;
  }

  const valid = moment(value);

  if (valid.isValid() === false) {
    throw message;
  }
};

Validator.extend('checkDatetimeFormat', checkDatetimeFormat);
