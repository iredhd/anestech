import React from 'react';
import PropTypes from 'prop-types';
import MuiLink from '@material-ui/core/Link';

const Link = ({ href, children }) => <MuiLink href={href}>{children}</MuiLink>;

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Link;
