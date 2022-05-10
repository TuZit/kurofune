import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import authSlice from './authSlice.js';
import { authApi } from '../services/authApi.js';
import { roleApi } from '../services/roleApi.js';
import { postApi } from '../services/postApi.js';
import { perApi } from '../services/perApi.js';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [perApi.reducerPath]: perApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      perApi.middleware,
      postApi.middleware,
      roleApi.middleware
    ),
});

setupListeners(store.dispatch);
