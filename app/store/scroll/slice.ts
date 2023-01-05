import { getStoreLocal } from "@/utils/local-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../store";

export interface IInitialState {
  scrollPosition: number;
}
const initialState: IInitialState = {
  scrollPosition: 0
}

export const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setScrollPositon(state, action: PayloadAction<number>) {
      state.scrollPosition = action.payload;
    },
  },

})

export const { setScrollPositon } =
  scrollSlice.actions;

export const setScroll = (state: TypeRootState) => state.scroll;

export const { reducer } = scrollSlice