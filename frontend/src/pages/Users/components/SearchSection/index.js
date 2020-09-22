import React, {
  useCallback, useState,
} from 'react';
import { Search, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Collapse, IconButton, Grid } from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  Input, Section, Button,
} from '../../../../components';
import useStyles from './styles';

const SearchSection = ({ onSubmit }) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);

  const initialValues = {
    name: '',
  };

  const {
    values, errors, touched, handleSubmit, handleChange,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().nullable(),
      email: Yup.string().nullable(),
    }),
    onSubmit,
  });

  const handleToggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <Section className={classes.root}>
      <div className={classes.collapseButtonContainer}>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: isExpanded,
          })}
          onClick={handleToggleExpand}
          aria-expanded={isExpanded}
        >
          <ExpandMoreIcon />
        </IconButton>
      </div>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Input
                name="name"
                label="Nome"
                onChange={handleChange}
                error={touched.name && errors.name}
                value={values.name}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input
                name="email"
                label="E-mail"
                onChange={handleChange}
                error={touched.email && errors.email}
                value={values.email}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.submitContainer}>
              <Button
                color="primary"
                type="submit"
              >
                <Search className={classes.searchIcon} />
                Pesquisar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Collapse>
    </Section>
  );
};

SearchSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchSection;
