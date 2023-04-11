import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./types";
import { getCartFromLS } from "@/utils/local-storage";

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id
      );
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.id;
      });
      if (findItem) {
        state.items = state.items.filter((obj) => {
          return obj.id !== action.payload.id;
        });
      }

    },
    clearItems(state) {
      state.items = [];
    },
  }
})

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer;