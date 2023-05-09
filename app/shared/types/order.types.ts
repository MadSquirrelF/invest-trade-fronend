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
  isSendTelegram?: boolean;
}

export interface IOrderEditAddress extends Omit<IOrder, '_id' | 'status' | 'total_count' | 'user' | 'isSendTelegram' | 'items'> { }

export interface IOrderCreate extends Omit<IOrder, '_id' | 'status' | 'address' | 'user' | 'isSendTelegram' | 'payment'> { }
