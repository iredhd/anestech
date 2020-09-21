import React, { useCallback, useState } from 'react';
import { Form } from '@unform/web';
import { Search, ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { Collapse, IconButton, Grid } from '@material-ui/core';
import classnames from 'classnames';

import {
  Input, Section, Button,
} from '../../../../components';
import useStyles from './styles';

const SearchSection = () => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);

  function handleSubmit(data) {
    console.log(data);
  }

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
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Input name="userId" label="Usuário" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input name="datetimeStart" label="Data de início" />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Input name="datetimeEnd" label="Data de término" />
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

export default SearchSection;
