import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductService } from "@/services/product.service";
import { IGetProducts } from "@/shared/types/product.types";
import { SearchProductParams } from "./types";

export const fetchProducts = createAsyncThunk<IGetProducts, SearchProductParams>(`products/fetchProductsStatuc`, async (params) => {
  const {
    orderBy, sortBy, page, searchTerm, categoryIds, brandIds,
  } = params;
  const { data } = await ProductService.getAll(searchTerm, page, orderBy, sortBy, categoryIds, brandIds);
  return data;
});
