import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import classnames from 'classnames';

import useStyles from './styles';

const Section = ({ children, className }) => {
  const classes = useStyles();

  return (<Paper className={classnames([classes.root, className])}>{children}</Paper>);
};

Section.defaultProps = {
  className: '',
};

Section.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
};

export default Section;
