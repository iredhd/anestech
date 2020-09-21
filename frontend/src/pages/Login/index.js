import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import {
  Section, Input, Button, Link,
} from '../../components';
import useStyles from './styles';
import logoColor from '../../assets/logo_color.png';
import { EMAIL_IS_REQUIRED, PASSWORD_MIN_LENGTH, PASSWORD_IS_REQUIRED } from '../../constants/validations';
import { Auth } from '../../services';
import { storeToken } from '../../store/actions/auth';
import { storeData } from '../../store/actions/user';

const Login = () => {
  const classes = useStyles();
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().email().required(EMAIL_IS_REQUIRED),
        password: Yup.string().min(6, PASSWORD_MIN_LENGTH).required(PASSWORD_IS_REQUIRED),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const login = await Auth.login(data);

      if (!login.success) {
        return console.error('error on auth');
      }

      const { token, user } = login.body;

      dispatch(storeToken(token));
      dispatch(storeData(user));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = {};

        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error) => {
            validationErrors[error.path] = error.message;
          });

          formRef.current.setErrors(validationErrors);
        }
      }
    }
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center" align="center">
        <Grid item xs={6} md={4}>
          <Section>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <img src={logoColor} alt="Anestech Logo" />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="email"
                    label="E-mail"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    name="password"
                    label="Senha"
                    type="password"
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
            </Form>
          </Section>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
