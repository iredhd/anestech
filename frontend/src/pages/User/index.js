import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import { Typography } from '@material-ui/core';
import { get } from 'lodash';
import moment from 'moment';
import {
  Section, Template, Button, LoadingWrapper,
} from '../../components';
import { Notify, User as UserService } from '../../services';
import { DATETIME_FORMAT } from '../../constants/format';
import { DeleteModal } from './components';

const User = () => {
  const { id } = useParams();
  const [user, serUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const loadUser = useCallback(async (userId) => {
    setIsLoading(true);
    const { success, body } = await UserService.get(userId);

    if (success) {
      serUser(body);
    } else {
      Notify.error(body);
      serUser({ });
    }

    setIsLoading(false);
  }, []);

  const handleDeleteModalToggle = useCallback(() => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  }, [isDeleteModalOpen]);

  useEffect(() => {
    loadUser(id);
  }, [id]);

  return (
    <Template>
      <Section>
        <LoadingWrapper isLoading={isLoading}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2">Nome:</Typography>
              <Typography variant="body1">{get(user, 'name', '-')}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2">E-mail:</Typography>
              <Typography variant="body1">{get(user, 'email', '-')}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2">Cadastrado em:</Typography>
              <Typography variant="body1">{moment(user.created_at).format(DATETIME_FORMAT)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2">Atualizado em:</Typography>
              <Typography variant="body1">{moment(user.updated_at).format(DATETIME_FORMAT)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle2">Tarefas:</Typography>
              <Typography variant="body1">{get(user, 'tasks', []).length}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={9}>
              <Grid container spacing={2} justify="flex-end" direction="row">
                <Grid item>
                  <Link to={`/usuarios/editar/${user.id}`}>
                    <Button variant="contained" color="primary">
                      Editar
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={handleDeleteModalToggle}>
                    Excluir
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </LoadingWrapper>
      </Section>
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleDeleteModalToggle}
      />
    </Template>
  );
};

export default User;
