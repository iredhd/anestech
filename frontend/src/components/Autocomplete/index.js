import React, { useCallback, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

const Autocomplete = ({
  label, name, id, options, onChange, onTextChange,
}) => {
  const inputRef = useRef(null);
  const {
    fieldName, registerField, error,
  } = useField(name);

  const handleChange = useCallback((_, option) => {
    onChange(option);
  }, [onChange]);

  useEffect(() => {
    registerField({
      name,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, name]);

  return (
    <MuiAutocomplete
      id={id}
      ref={inputRef}
      options={options}
      getOptionLabel={(option) => option.label}
      clearOnBlur
      onChange={handleChange}
      noOptionsText="Nenhuma opção encontrada."
      renderInput={(params) => (
        <TextField
          error={!!error}
          fullWidth
          helperText={error}
          onChange={onTextChange}
          {...params}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

Autocomplete.defaultProps = {
  onTextChange: () => {},
  id: '',
};

Autocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  onTextChange: PropTypes.func,
};

export default Autocomplete;
