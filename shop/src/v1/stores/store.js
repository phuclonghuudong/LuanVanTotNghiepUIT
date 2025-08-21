// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // ✅ default import

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: import.meta.env.DEV,
});
