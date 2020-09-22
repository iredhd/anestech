import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Search, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Collapse, IconButton, Grid } from '@material-ui/core';
import classnames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import {
  Input, Section, Button, Autocomplete, DatePicker,
} from '../../../../components';
import useStyles from './styles';
import { Notify, User } from '../../../../services';

const SearchSection = ({ onSubmit }) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState({
    options: [],
    debounce: null,
  });

  const initialValues = {
    userId: '',
    datetimeStart: '',
    datetimeEnd: '',
    description: '',
  };

  const {
    values, errors, touched, setFieldValue, handleSubmit, handleChange,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      userId: Yup.number().nullable(),
      datetimeStart: Yup.date().nullable(),
      datetimeEnd: Yup.date().nullable(),
      description: Yup.string().nullable(),
    }),
    onSubmit,
  });

  const handleToggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const loadUsers = useCallback(async ({
    name = '',
  } = {}) => {
    const { success, body } = await User.getList({
      name,
    });

    if (success) {
      setUsers({
        ...users,
        options: body.items.map((user) => ({
          ...user,
          id: user.id,
          label: user.name,
        })),
      });
    } else {
      Notify.error(body);

      setUsers({
        options: [],
        debounce: null,
      });
    }
  }, [users]);

  const handleUserChange = useCallback((value) => {
    setFieldValue('userId', get(value, 'id', null));
  }, [setFieldValue]);

  const handleUserTextChange = useCallback(({ target: { value } }) => {
    if (users.debounce) {
      clearInterval(users.debounce);
    }

    setUsers({
      ...users,
      debounce: setTimeout(() => loadUsers({ name: value }), 700),
    });
  }, [users]);

  const handleDateChange = useCallback(({ name, value }) => {
    setFieldValue(name, moment(value).isValid() ? moment(value).toDate() : null);
  }, [setFieldValue]);

  useEffect(() => {
    loadUsers();
  }, []);

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
              <Autocomplete
                name="userId"
                label="Responsável"
                options={users.options}
                onChange={handleUserChange}
                onTextChange={handleUserTextChange}
                error={touched.userId && errors.userId}
                value={values.userId}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                name="datetimeStart"
                label="Data de início"
                onChange={handleDateChange}
                error={touched.datetimeStart && errors.datetimeStart}
                value={values.datetimeStart}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                name="datetimeEnd"
                label="Data de término"
                onChange={handleDateChange}
                error={touched.datetimeEnd && errors.datetimeEnd}
                value={values.datetimeEnd}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Input
                name="description"
                label="Descrição"
                onChange={handleChange}
                error={touched.description && errors.description}
                value={values.description}
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
