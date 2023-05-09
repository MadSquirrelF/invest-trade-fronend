import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemType, CartSliceState } from "./types";
import { getCartFromLS } from "@/utils/local-storage";

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: `cart`,
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload.id,
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
    addFavorites(state, action: PayloadAction<CartItemType[] | undefined>) {
      if (action.payload === undefined) {
        return;
      }

      let newState = [...state.items, ...action.payload];

      newState = newState.filter((obj, index) => newState.findIndex((item) => item.id === obj.id) === index);
      state.items = newState;
    },
    minusItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find(
        (obj) => obj.id === action.payload.id,
      );
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      }
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const {
  addItem, removeItem, clearItems, minusItem, addFavorites,
} = cartSlice.actions;

export default cartSlice.reducer;
