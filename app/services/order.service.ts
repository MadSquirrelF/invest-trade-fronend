import { getOrdersUrl } from "config/api.config";
import axios from "../api/interceptors";
import {
  IOrder, IOrderChangeStatus, IOrderCreate, IOrderEditAddress, IOrderEditAdmin,
} from "@/shared/types/order.types";

export const OrderService = {
  async getAllOrders(statusOrder?: string) {
    return axios.get<IOrder[]>(getOrdersUrl(``), {
      params: statusOrder ? { statusOrder } : {},
    });
  },

  async getOrderById(_id: string) {
    return axios.get<IOrder>(getOrdersUrl(`/${_id}`));
  },

  async updateAdminOrder(_id: string, data: IOrderEditAdmin) {
    return axios.put<string>(getOrdersUrl(`/${_id}`), data);
  },

  async getAllUserOrders(statusOrder?: string) {
    return axios.get<IOrder[]>(getOrdersUrl(`/user-orders`), {
      params: statusOrder ? { statusOrder } : {},
    });
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

  async changeOrderStatus(_id: string, dto: IOrderChangeStatus) {
    return axios.put<string>(getOrdersUrl(`/change-status/${_id}`), dto);
  },
};
