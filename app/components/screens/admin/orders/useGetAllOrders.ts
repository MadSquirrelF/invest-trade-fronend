import { useMutation, useQuery } from "react-query";

import { useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { getAdminUrl } from "config/url.config";
import { OrderService } from "@/services/order.service";
import { toastError } from "@/utils/toastError";
import { CartItemType } from "@/store/cart/types";
import { selectFilter } from "@/store/filter/selectors";
import { convertMongoDbData } from "@/utils/date/ConvertMongoDbData";

export const useGetAllOrders = () => {
  interface IUserTableItem {
    _id: string;
    editUrl: string;
    items: string[];
    products: CartItemType[];
  }

  const { orderSortValue } = useSelector(selectFilter);

  const orderList = useQuery([`admin orders list`, orderSortValue], () => OrderService.getAllOrders(orderSortValue === `Все` ? `` : String(orderSortValue)), {
    select: ({ data }) => data.map((order): IUserTableItem => ({
      _id: order._id,
      editUrl: getAdminUrl(`order/edit/${order._id}`),
      items: [order._id, order.user.username, convertMongoDbData(order.createdAt), order.status, order.address.street, order.payment],
      products: order.items,
    })),
    onError: (error) => {
      toastError(error, `Список заказов`);
    },
  });

  const { mutateAsync: cancelAsync } = useMutation(`cancel order admin`, (OrderId: string) => OrderService.cancelOrder(OrderId), {
    onError: (error) => {
      toastError(error, `Отмена заказа`);
    },
    onSuccess: () => {
      toastr.success(`Отмена заказа`, `Заказ успешно отменен`);
      orderList.refetch();
    },
  });

  const { mutateAsync: deleteAsync } = useMutation(`delete order admin`, (OrderId: string) => OrderService.deleteOrder(OrderId), {
    onError: (error) => {
      toastError(error, `Удаление заказа`);
    },
    onSuccess: () => {
      toastr.success(`Удаление заказа`, `Заказ успешно удалален`);
      orderList.refetch();
    },
  });

  return {
    ...orderList,
    cancelAsync,
    deleteAsync,
  };
};
