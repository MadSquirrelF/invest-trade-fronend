import { IWork } from "@/shared/types/product.types";

export interface IWorkEditInput extends Omit<IWork, '_id'> { }