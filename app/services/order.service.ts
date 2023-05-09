import { getOrdersUrl } from "config/api.config";
import axios from "../api/interceptors";
import { IOrder, IOrderCreate, IOrderEditAddress } from "@/shared/types/order.types";

export const OrderService = {
  async getAllOrders(searchTerm?: string) {
    return axios.get<IOrder[]>(getOrdersUrl(``), {
      params: searchTerm ? { searchTerm } : {},
    });
  },

  async getOrderById(_id: string) {
    return axios.get<IOrder>(getOrdersUrl(`/${_id}`));
  },

  async getAllUserOrders() {
    return axios.get<IOrder[]>(getOrdersUrl(`/user-orders`));
  },

  async updateOrderUser(_id: string, data: IOrderEditAddress) {
    return axios.put<string>(getOrdersUrl(`/update/${_id}`), data);
  },

  async createOrder(data: IOrderCreate) {
    return axios.post<string>(getOrdersUrl(`/create-order`), data);
  },

  async deleteOrder(_id: string) {
    return axios.delete<string>(getOrdersUrl(`/${_id}`));
  },

  async cancelOrder(_id: string) {
    return axios.put<string>(getOrdersUrl(`/cancel/${_id}`));
  },
};
