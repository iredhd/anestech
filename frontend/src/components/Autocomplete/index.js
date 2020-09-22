import React, { useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { find } from 'lodash';

const Autocomplete = ({
  label, error, id: elementId, options, onChange, onTextChange, value,
}) => {
  const handleChange = useCallback((_, option) => {
    onChange(option);
  }, [onChange]);

  return (
    <MuiAutocomplete
      id={elementId}
      options={options}
      clearOnBlur
      value={find(options, ({ id }) => id === value) || null}
      getOptionLabel={(option) => option.label}
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
  error: false,
  value: '',
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default Autocomplete;
