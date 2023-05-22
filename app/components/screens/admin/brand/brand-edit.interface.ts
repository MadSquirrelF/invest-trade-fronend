import { IBrand } from "@/shared/types/product.types";

export interface IBrandEditInput extends Omit<IBrand, '_id'> { }