import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { Auth } from '../../services';
import { clearToken } from '../../store/actions/auth';
import { clearData } from '../../store/actions/user';

const PrivateRoute = (props) => {
  const auth = useSelector(({ auth: authState }) => authState);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = useCallback(async () => {
    dispatch(clearToken());
    dispatch(clearData());
    Auth.logout();
    history.push('/');
  }, [dispatch, history]);

  useEffect(() => {
    if (auth.token) {
      const actualToken = Auth.getToken().body;

      if (auth.token !== actualToken) {
        Auth.setToken(auth.token);
      }
    } else {
      handleLogout();
    }
  }, [auth.token, history, handleLogout]);

  return (
    <Route {...props} />
  );
};

export default PrivateRoute;
