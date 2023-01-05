import { IProduct } from "@/shared/types/product.types";

export interface IProductEditInput extends Omit<IProduct, '_id'> { }