import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const Input = ({ name, error, ...rest }) => (
  <TextField
    name={name}
    variant="outlined"
    error={!!error}
    fullWidth
    helperText={error}
    {...rest}
  />
);

Input.defaultProps = {
  error: false,
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Input;
