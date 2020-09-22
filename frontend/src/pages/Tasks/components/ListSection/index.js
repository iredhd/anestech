import React from 'react';
import {
  TableBody, TableRow, TableCell, TableHead, IconButton, Table,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import moment from 'moment';
import { Visibility as VisibilityIcon, Add } from '@material-ui/icons';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Section, Button, LoadingWrapper } from '../../../../components';
import { DATETIME_FORMAT } from '../../../../constants/format';
import useStyles from './styles';
import { LIMIT_ITEMS_PER_PAGE } from '../../../../constants/API';

const ListSection = ({
  data: {
    items = [], page = 1, total = 0, perPage = LIMIT_ITEMS_PER_PAGE,
  },
  onPaginate,
  isLoading,
}) => {
  const classes = useStyles();

  return (
    <Section className={classes.tableContainer}>
      <div className={classes.addContainer}>
        <Link to="/tarefas/criar">
          <Button color="primary">
            <Add />
            Adicionar
          </Button>
        </Link>
      </div>
      <LoadingWrapper isLoading={isLoading}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Responsável</TableCell>
              <TableCell>Início</TableCell>
              <TableCell>Término</TableCell>
              <TableCell align="right">Detalhes</TableCell>
            </TableRow>
          </TableHead>
          {items.length ? (
            <TableBody>
              {items.map((row) => (
                <TableRow key={row.id.toString()}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{moment(row.datetimeStart).format(DATETIME_FORMAT)}</TableCell>
                  <TableCell>{row.datetimeEnd ? moment(row.datetimeEnd).format(DATETIME_FORMAT) : '-'}</TableCell>
                  <TableCell align="right">
                    <Link to={`/tarefas/ver/${row.id}`}>
                      <IconButton size="small">
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" colSpan="6" align="center">
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        {Math.ceil(total / perPage) > 0 && (
        <div
          className={classes.paginationContainer}
        >
          <Pagination
            page={page}
            count={Math.ceil(total / perPage)}
            color="primary"
            onChange={onPaginate}
          />
        </div>
        )}
      </LoadingWrapper>
    </Section>
  );
};

ListSection.defaultProps = {
  data: {
    items: [],
    perPage: LIMIT_ITEMS_PER_PAGE,
    page: 1,
    total: 0,
  },
  isLoading: false,
};

ListSection.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      datetimeStart: PropTypes.string.isRequired,
      datetimeEnd: PropTypes.string,
    })),
    perPage: PropTypes.number,
    total: PropTypes.number,
    page: PropTypes.number,
  }),
  onPaginate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default ListSection;
