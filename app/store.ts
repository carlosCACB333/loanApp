import {configureStore} from '@reduxjs/toolkit';
import loanReducer from './loanSlice';
import {contractApi} from './services';
import {authApi} from './services/auth';
export const store = configureStore({
  reducer: {
    loan: loanReducer,
    [authApi.reducerPath]: authApi.reducer,
    [contractApi.reducerPath]: contractApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([authApi.middleware, contractApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
