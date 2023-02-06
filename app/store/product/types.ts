import { IGetProducts, IProduct } from "@/shared/types/product.types";

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface ProductSliceState {
  items: IGetProducts;
  status: Status;
}

export type SearchProductParams = {
  orderBy: string;
  sortBy: string;
  searchTerm: string;
  page: string;
  categoryIds: string;
  brandIds: string
}