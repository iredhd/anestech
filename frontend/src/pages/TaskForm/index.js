import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { get } from 'lodash';
import { useFormik } from 'formik';
import moment from 'moment';

import { Add, Edit } from '@material-ui/icons';
import {
  Section, Template, Button, LoadingWrapper, Autocomplete, Input, DateTimePicker,
} from '../../components';
import { Notify, Task as TaskService, User } from '../../services';
import {
  TASK_DATETIME_START_IS_REQUIRED, TASK_OWNER_ID_IS_REQUIRED,
  TASK_DESCRIPTION_IS_REQUIRED, DATETIME_INVALID,
} from '../../constants/validations';
import useStyles from './styles';

const TaskForm = () => {
  const classes = useStyles();
  const formRef = useRef(null);
  const history = useHistory();
  const { id } = useParams();
  const [users, setUsers] = useState({
    debounce: null,
    options: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const isCreate = !id;

  const initialValues = {
    userId: '',
    datetimeStart: '',
    datetimeEnd: '',
    description: '',
  };

  const {
    values, errors, touched, setFieldValue, handleSubmit, handleChange, setValues,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      userId: Yup.number().required(TASK_OWNER_ID_IS_REQUIRED),
      datetimeStart: Yup.date(DATETIME_INVALID).required(TASK_DATETIME_START_IS_REQUIRED),
      datetimeEnd: Yup.date(DATETIME_INVALID).nullable(),
      description: Yup.string().required(TASK_DESCRIPTION_IS_REQUIRED),
    }),
    onSubmit: async (formValues) => {
      setIsLoading(true);

      const { datetimeEnd, ...payload } = formValues;

      if (moment(datetimeEnd).isValid()) {
        payload.datetimeEnd = moment(datetimeEnd).toDate();
      }

      payload.datetimeStart = moment(payload.datetimeStart).toDate();

      if (isCreate) {
        const { success, body } = await TaskService.create(payload);

        if (success) {
          history.push('/tarefas');
        } else {
          Notify.error(body);
        }
      } else {
        const { success, body } = await TaskService.update(id, payload);
        if (success) {
          history.goBack();
        } else {
          Notify.error(body);
        }
      }

      setIsLoading(false);
    },
  });

  const loadTask = useCallback(async (taskId) => {
    setIsLoading(true);
    const { success, body } = await TaskService.get(taskId);

    if (success) {
      setValues({
        userId: body.user.id,
        datetimeEnd: moment(body.datetimeEnd).isValid() ? body.datetimeEnd : '',
        datetimeStart: body.datetimeStart,
        description: body.description,
      });
    } else {
      Notify.error(body);
      setValues({ });
    }

    setIsLoading(false);
  }, []);

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
    setFieldValue('userId', get(value, 'id', null));
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

  const handleDatetimeChange = useCallback(({ name, value }) => {
    setFieldValue(name, moment(value).isValid() ? moment(value).toDate() : null);
  }, [setFieldValue]);

  useEffect(() => {
    loadUsers();

    if (id) {
      loadTask(id);
    }
  }, [id]);

  return (
    <Template>
      <Section>
        <LoadingWrapper isLoading={isLoading}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Autocomplete
                  name="userId"
                  label="Responsável"
                  options={users.options}
                  onChange={handleUserChange}
                  error={touched.userId && errors.userId}
                  onTextChange={handleUserTextChange}
                  value={values.userId}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DateTimePicker
                  name="datetimeStart"
                  label="Início"
                  onChange={handleDatetimeChange}
                  value={values.datetimeStart}
                  error={touched.datetimeStart && errors.datetimeStart}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DateTimePicker
                  name="datetimeEnd"
                  label="Término"
                  onChange={handleDatetimeChange}
                  value={values.datetimeEnd}
                  error={touched.datetimeEnd && errors.datetimeEnd}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Input
                  name="description"
                  label="Descrição"
                  onChange={handleChange}
                  value={values.description}
                  error={touched.description && errors.description}
                />
              </Grid>
              <Grid item xs={12} sm={4} className={classes.submitContainer}>
                <Button
                  color="primary"
                  type="submit"
                >
                  {isCreate
                    ? (
                      <>
                        <Add className={classes.addIcon} />
                        Adicionar
                      </>
                    )
                    : (
                      <>
                        <Edit className={classes.addIcon} />
                        Editar
                      </>
                    )}

                </Button>
              </Grid>
            </Grid>
          </form>
        </LoadingWrapper>
      </Section>
    </Template>
  );
};

export default TaskForm;
