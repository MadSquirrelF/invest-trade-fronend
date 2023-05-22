import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRootState } from "../store";

export interface IInitialState {
  modal: boolean;
  type: string;
  nav: boolean;
}

const initialState: IInitialState = {
  modal: false,
  type: `login`,
  nav: false,
};

export const modalSlice = createSlice({
  name: `modal`,
  initialState,
  reducers: {
    setLogin(state) {
      state.type = `login`;
    },
    setRegistration(state) {
      state.type = `registration`;
    },
    showModal(state) {
      state.modal = true;
    },
    hideModal(state) {
      state.modal = false;
    },
    setNav(state, action: PayloadAction<boolean>) {
      state.nav = action.payload;
    },

  },

});

export const {
  hideModal, showModal, setLogin, setRegistration, setNav,
} = modalSlice.actions;

export const selectModal = (state: TypeRootState) => state.modal;

export const { reducer } = modalSlice;
