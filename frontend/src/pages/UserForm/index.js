import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { Add, Edit } from '@material-ui/icons';
import {
  Section, Template, Button, LoadingWrapper, Input,
} from '../../components';
import { Notify, User } from '../../services';
import {
  EMAIL_INVALID, EMAIL_IS_REQUIRED, PASSWORD_IS_REQUIRED,
  PASSWORD_CONFIRM_IS_REQUIRED, PASSWORD_MIN_LENGTH,
  PASSWORD_CONFIRM_DOESNT_MATCH, NAME_IS_REQUIRED,
} from '../../constants/validations';
import useStyles from './styles';

const UserForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const isCreate = !id;

  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const {
    values, errors, touched, handleSubmit, handleChange, setValues,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required(NAME_IS_REQUIRED),
      email: Yup.string().email(EMAIL_INVALID).required(EMAIL_IS_REQUIRED),
      password: isCreate
        ? Yup.string().min(6, PASSWORD_MIN_LENGTH).required(PASSWORD_IS_REQUIRED)
        : Yup.string().min(6, PASSWORD_MIN_LENGTH),
      passwordConfirmation: isCreate
        ? Yup.string().oneOf([Yup.ref('password'), null], PASSWORD_CONFIRM_DOESNT_MATCH).required(PASSWORD_CONFIRM_IS_REQUIRED)
        : Yup.string().oneOf([Yup.ref('password'), null], PASSWORD_CONFIRM_DOESNT_MATCH)
          .when('password', {
            is: (password = '') => password.length > 0,
            then: Yup.string().oneOf([Yup.ref('password'), null], PASSWORD_CONFIRM_DOESNT_MATCH).required(PASSWORD_CONFIRM_IS_REQUIRED),
          }),
    }),
    onSubmit: async (formValues) => {
      setIsLoading(true);

      const { datetimeEnd, ...payload } = formValues;

      if (isCreate) {
        const { success, body } = await User.create(payload);

        if (success) {
          history.push('/usuarios');
        } else {
          Notify.error(body);
        }
      } else {
        const { success, body } = await User.update(id, payload);
        if (success) {
          history.goBack();
        } else {
          Notify.error(body);
        }
      }

      setIsLoading(false);
    },
  });

  const loadUser = useCallback(async (userId) => {
    setIsLoading(true);
    const { success, body } = await User.get(userId);

    if (success) {
      setValues({
        name: body.name,
        email: body.email,
      });
    } else {
      Notify.error(body);
      setValues({ });
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (id) {
      loadUser(id);
    }
  }, [id]);

  return (
    <Template>
      <Section>
        <LoadingWrapper isLoading={isLoading}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input
                  name="name"
                  label="Nome"
                  onChange={handleChange}
                  error={touched.name && errors.name}
                  value={values.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  name="email"
                  label="E-mail"
                  type="email"
                  onChange={handleChange}
                  error={touched.email && errors.email}
                  value={values.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  name="password"
                  label="Senha"
                  type="password"
                  onChange={handleChange}
                  error={touched.password && errors.password}
                  value={values.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input
                  name="passwordConfirmation"
                  label="Confirmação de senha"
                  type="password"
                  onChange={handleChange}
                  error={touched.password && errors.passwordConfirmation}
                  value={values.passwordConfirmation}
                />
              </Grid>
              <Grid item xs={12} className={classes.submitContainer}>
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

export default UserForm;
