import { configureStore } from "@reduxjs/toolkit";
import baseUrlReducer from "./reducer/getbaseUrlReducer";
import authSlice from "./reducer/auth-slice";

export const store = configureStore({
  reducer: {
    baseUrl: baseUrlReducer,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
