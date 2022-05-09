import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { setupListeners } from '@reduxjs/toolkit/query';

import authSlice from './authSlice.js';
import { authApi } from '../services/authApi.js';
import { roleApi } from '../services/roleApi.js';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth'],
};
const reducer = combineReducers({
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [roleApi.reducerPath]: roleApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, roleApi.middleware),
});

export const persistor = persistStore(store);

export default store;
