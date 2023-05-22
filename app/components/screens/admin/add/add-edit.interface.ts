import { IAdds } from "@/shared/types/product.types";

export interface IAddEditInput extends Omit<IAdds, '_id'> { }
