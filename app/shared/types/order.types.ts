import { CartItemType } from "@/store/cart/types";
import { IUser } from "./user.types";

export interface IAddress {
  country: string;

  city: string;

  street: string;
}

export interface IOrder {
  _id: string;
  status: string;
  total_count: number;
  address: IAddress;
  payment: string;
  user: IUser;
  items: CartItemType[];
  createdAt: string;
  isSendTelegram?: boolean;
}

export interface IOrderEditAddress extends Omit<IOrder, '_id' | 'status' | 'total_count' | 'user' | 'isSendTelegram' | 'createdAt' | 'items'> { }
export interface IOrderEditAdmin extends Omit<IOrder, '_id' | 'total_count' | 'user' | 'items' | 'isSendTelegram' | 'createdAt'> { }
export interface IOrderChangeStatus extends Pick<IOrder, 'status' > { }
export interface IOrderCreate extends Omit<IOrder, '_id' | 'status' | 'address' | 'user' | 'isSendTelegram' | 'createdAt' | 'payment'> { }
