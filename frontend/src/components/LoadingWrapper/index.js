import React from 'react';
import { CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './styles';

const LoadingWrapper = ({ isLoading, children }) => {
  const classes = useStyles();

  return isLoading
    ? (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    )
    : children;
};

LoadingWrapper.defaultProps = {
  isLoading: false,
};

LoadingWrapper.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default LoadingWrapper;
