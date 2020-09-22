import React from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import {
  Section, Input, Button, Link,
} from '../../components';
import useStyles from './styles';
import logoColor from '../../assets/logo_color.png';
import { EMAIL_IS_REQUIRED, PASSWORD_MIN_LENGTH, PASSWORD_IS_REQUIRED } from '../../constants/validations';
import { Auth, Notify } from '../../services';
import { storeToken } from '../../store/actions/auth';
import { storeData } from '../../store/actions/user';
import { USER_OR_PASSWORD_IS_INVALID } from '../../constants/API';

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const {
    values, errors, touched, handleSubmit, handleChange,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(EMAIL_IS_REQUIRED),
      password: Yup.string().min(6, PASSWORD_MIN_LENGTH).required(PASSWORD_IS_REQUIRED),
    }),
    onSubmit: async (formValues) => {
      const login = await Auth.login(formValues);

      if (!login.success) {
        return Notify.error(USER_OR_PASSWORD_IS_INVALID);
      }

      const { token, user } = login.body;

      dispatch(storeToken(token));
      dispatch(storeData(user));
    },
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center" align="center">
        <Grid item xs={6} md={4}>
          <Section>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <img src={logoColor} alt="Anestech Logo" />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="email"
                    label="E-mail"
                    type="email"
                    error={touched.email && errors.email}
                    value={values.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="password"
                    label="Senha"
                    type="password"
                    error={touched.password && errors.password}
                    value={values.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="primary"
                    type="submit"
                  >
                    Entrar
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link href="/registrar">
                    Não tem conta? Clique aqui!
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Section>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
