import { ICategory } from "@/shared/types/product.types";

export interface ICategoryEditInput extends Omit<ICategory, '_id'> { }