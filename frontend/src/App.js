import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import 'moment';
import 'toastr/build/toastr.css';

import Routes from './routes';
import theme from './styles/theme';
import { store, persistor } from './store';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>
            <Routes />
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
