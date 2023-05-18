import { INew } from "@/shared/types/product.types";

export interface INewEditInput extends Omit<INew, '_id'> { }
