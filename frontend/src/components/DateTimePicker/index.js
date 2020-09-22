import React, {
  useCallback,
} from 'react';
import {
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';

import { DATETIME_FORMAT } from '../../constants/format';

const DateTimePicker = ({
  label, value, error, name, onChange,
}) => {
  const handleDateChange = useCallback((date) => {
    onChange({ name, value: date });
  }, []);

  return (
    <KeyboardDateTimePicker
      error={!!error}
      helperText={error}
      value={value ? new Date(value) : null}
      onChange={handleDateChange}
      inputVariant="outlined"
      fullWidth
      label={label}
      format={DATETIME_FORMAT}
      allowKeyboardControl={false}
    />
  );
};

DateTimePicker.defaultProps = {
  error: false,
  value: '',
};

DateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default DateTimePicker;
