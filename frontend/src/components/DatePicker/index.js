import React, {
  useCallback,
} from 'react';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';

import { DATE_FORMAT } from '../../constants/format';

const DatePicker = ({
  label, value, error, name, onChange,
}) => {
  const handleDateChange = useCallback((date) => {
    onChange({ name, value: date });
  }, []);

  return (
    <KeyboardDatePicker
      error={!!error}
      helperText={error}
      value={value ? new Date(value) : null}
      onChange={handleDateChange}
      inputVariant="outlined"
      fullWidth
      label={label}
      format={DATE_FORMAT}
      allowKeyboardControl={false}
    />
  );
};

DatePicker.defaultProps = {
  error: false,
  value: '',
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default DatePicker;
