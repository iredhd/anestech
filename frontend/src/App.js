import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes';
import theme from './styles/theme';
import { store, persistor } from './store';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={createBrowserHistory()}>
          <Routes />
        </Router>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
