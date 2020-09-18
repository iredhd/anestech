import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';

const Button = ({ children, ...rest }) => (
  <MuiButton variant="contained" {...rest}>
    {children}
  </MuiButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default Button;
