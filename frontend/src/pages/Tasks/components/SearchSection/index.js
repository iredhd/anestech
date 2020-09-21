import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { Form } from '@unform/web';
import { Search, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Collapse, IconButton, Grid } from '@material-ui/core';
import classnames from 'classnames';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  Input, Section, Button, Autocomplete,
} from '../../../../components';
import useStyles from './styles';
import { User } from '../../../../services';

const SearchSection = ({ onSubmit }) => {
  const formRef = useRef(null);
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState({
    options: [],
    debounce: null,
  });

  const handleSubmit = useCallback((data) => {
    onSubmit(data);
  }, []);

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
      setUsers({
        options: [],
        debounce: null,
      });
    }
  }, [users]);

  const handleUserChange = useCallback((value) => {
    console.log(get(value, 'id', null));
    formRef.current.setFieldValue('userId', get(value, 'id', null));
  }, [formRef]);

  const handleUserTextChange = useCallback(({ target: { value } }) => {
    if (users.debounce) {
      clearInterval(users.debounce);
    }

    setUsers({
      ...users,
      debounce: setTimeout(() => loadUsers({ name: value }), 700),
    });
  }, [users]);

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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                name="userId"
                label="Usuário"
                options={users.options}
                onChange={handleUserChange}
                onTextChange={handleUserTextChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input name="datetimeStart" disabled label="Data de início" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input name="datetimeEnd" disabled label="Data de término" />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Input name="description" label="Descrição" />
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
        </Form>
      </Collapse>
    </Section>
  );
};

SearchSection.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchSection;
