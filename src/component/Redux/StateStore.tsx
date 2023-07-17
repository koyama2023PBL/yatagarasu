import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './MenuState';
import dateReducer from './DateState';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    date: dateReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;