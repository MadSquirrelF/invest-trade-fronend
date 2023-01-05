import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { reducers } from "./rootReducer";

export const store = configureStore({
  reducer: reducers,
  devTools: true
})

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type TypeRootState = ReturnType<typeof store.getState>

