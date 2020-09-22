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
import {
  EMAIL_IS_REQUIRED, PASSWORD_MIN_LENGTH, PASSWORD_IS_REQUIRED, NAME_IS_REQUIRED,
  PASSWORD_CONFIRM_DOESNT_MATCH, PASSWORD_CONFIRM_IS_REQUIRED, EMAIL_INVALID,
} from '../../constants/validations';
import { storeToken } from '../../store/actions/auth';
import { Auth, Notify } from '../../services';
import { storeData } from '../../store/actions/user';
import { INTERNAL_ERROR } from '../../constants/API';

const Register = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const {
    values, errors, touched, handleSubmit, handleChange,
  } = useFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      name: Yup.string().required(NAME_IS_REQUIRED),
      email: Yup.string().email(EMAIL_INVALID).required(EMAIL_IS_REQUIRED),
      password: Yup.string().min(6, PASSWORD_MIN_LENGTH).required(PASSWORD_IS_REQUIRED),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], PASSWORD_CONFIRM_DOESNT_MATCH).required(PASSWORD_CONFIRM_IS_REQUIRED),
    }),
    onSubmit: async (formValues) => {
      const register = await Auth.register(formValues);

      if (!register.success) {
        return Notify.error(register.body);
      }

      const login = await Auth.login(formValues);

      if (!login.success) {
        return Notify.error(INTERNAL_ERROR);
      }

      dispatch(storeToken(login.body.token));
      dispatch(storeData(login.body.user));
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
                    name="name"
                    label="Nome"
                    type="text"
                    error={touched.name && errors.name}
                    onChange={handleChange}
                    value={values.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="email"
                    label="E-mail"
                    type="email"
                    error={touched.email && errors.email}
                    onChange={handleChange}
                    value={values.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="password"
                    label="Senha"
                    type="password"
                    error={touched.password && errors.password}
                    onChange={handleChange}
                    value={values.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="passwordConfirmation"
                    label="Confirmação de senha"
                    type="password"
                    error={touched.passwordConfirmation && errors.passwordConfirmation}
                    onChange={handleChange}
                    value={values.passwordConfirmation}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="primary"
                    type="submit"
                  >
                    Cadastrar
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link href="/">
                    Já possui uma conta? Clique aqui!
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
export default Register;
