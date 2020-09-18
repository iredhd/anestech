import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createEncryptor from 'redux-persist-transform-encrypt';

import * as reducers from './reducers';

const encryptor = createEncryptor({
  secretKey: process.env.REACT_APP_REDUX_SECRET_KEY,
});

const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));

const store = createStore(persistedReducer, compose(applyMiddleware(
  thunk,
)));

const persistor = persistStore(store);

export { store, persistor };
