import {configureStore} from '@reduxjs/toolkit'
import { sliceReducer } from "./slice";
import { dictionApi } from "./dictionAPI";

export const store = configureStore({
  reducer: {
    [dictionApi.reducerPath]: dictionApi.reducer,
    diction: sliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dictionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>