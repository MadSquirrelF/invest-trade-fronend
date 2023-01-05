import { ProductService } from "@/services/product.service";
import { IProduct } from "@/shared/types/product.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SearchProductParams } from "./types";

export const fetchProducts = createAsyncThunk<IProduct[], SearchProductParams>('products/fetchProductsStatuc', async (params) => {
  const { orderBy, sortBy, page, searchTerm, categoryIds } = params;
  const { data } = await ProductService.getAll(searchTerm, page, orderBy, sortBy, categoryIds)
  return data
})