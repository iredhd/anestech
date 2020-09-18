import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import useStyles from './styles';

const Section = ({ children }) => {
  const classes = useStyles();

  return (<Paper className={classes.root}>{children}</Paper>);
};

Section.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

export default Section;
