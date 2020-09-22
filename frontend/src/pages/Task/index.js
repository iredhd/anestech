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
import { Notify, Task as TaskService } from '../../services';
import { DATETIME_FORMAT, DATETIME_DIFERENCE } from '../../constants/format';
import { DeleteModal } from './components';

const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const loadTask = useCallback(async (taskId) => {
    setIsLoading(true);
    const { success, body } = await TaskService.get(taskId);

    if (success) {
      if (moment(body.datetimeEnd).isValid() && moment(body.datetimeStart).isValid()) {
        const timeDiff = moment.utc(moment(body.datetimeEnd).diff(body.datetimeStart));
        body.timeSpent = moment(timeDiff).format(DATETIME_DIFERENCE);
      }

      setTask(body);
    } else {
      Notify.error(body);
      setTask({ });
    }

    setIsLoading(false);
  }, []);

  const handleDeleteModalToggle = useCallback(() => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  }, [isDeleteModalOpen]);

  useEffect(() => {
    loadTask(id);
  }, [id]);

  return (
    <Template>
      <Section>
        <LoadingWrapper isLoading={isLoading}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle2">Responsável:</Typography>
              <Typography variant="body1">{get(task, 'user.name', '-')}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle2">Início:</Typography>
              <Typography variant="body1">{task.datetimeStart && moment(task.datetimeStart).isValid() ? moment(task.datetimeStart).format(DATETIME_FORMAT) : '-'}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle2">Término:</Typography>
              <Typography variant="body1">{task.datetimeEnd && moment(task.datetimeEnd).isValid() ? moment(task.datetimeEnd).format(DATETIME_FORMAT) : '-'}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle2">Tempo gasto:</Typography>
              <Typography variant="body1">{get(task, 'timeSpent', '-')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Descrição:</Typography>
              <Typography variant="body1">{get(task, 'description', '-')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justify="flex-end" direction="row">
                <Grid item>
                  <Link to={`/tarefas/editar/${task.id}`}>
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

export default Task;
