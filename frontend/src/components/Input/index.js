import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { useField } from '@unform/core';

const Input = ({ name, ...rest }) => {
  const inputRef = useRef(null);

  const {
    fieldName, registerField, error,
  } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <TextField
      inputRef={inputRef}
      variant="outlined"
      error={!!error}
      fullWidth
      helperText={error}
      {...rest}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Input;
