import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGetProducts } from "@/shared/types/product.types";
import { fetchProducts } from "./asyncActions";
import { ProductSliceState, Status } from "./types";

const initialState: ProductSliceState = {
  items: {
    data: [],
    total: 0,
    pageOf: 1,
    last_page: 0,
  },
  status: Status.LOADING,
};

const productSlice = createSlice({
  name: `product`,
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<IGetProducts>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
      state.items.data = [];
      state.items.total = 0;
      state.items.pageOf = 1;
      state.items.last_page = 1;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.items.data = [];
      state.items.total = 0;
      state.items.pageOf = 1;
      state.items.last_page = 1;
    });
  },
});

export const { setItems } = productSlice.actions;

export default productSlice.reducer;
