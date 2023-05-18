import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";

import { useSelector } from "react-redux";
import { useAuth } from "@/hooks/useAuth";
import { convertMongoDbData } from "@/utils/date/ConvertMongoDbData";
import { toastError } from "@/utils/toastError";
import { OrderService } from "@/services/order.service";
import { selectFilter } from "@/store/filter/selectors";
import { CartItemType } from "@/store/cart/types";

export const useOrder = () => {
  const { user } = useAuth();

  interface IUserTableItem {
    _id: string;
    items: string[];
    products: CartItemType[];
  }

  const { orderSortValue } = useSelector(selectFilter);

  const queryData = useQuery([`user orders list`, orderSortValue], () => OrderService.getAllUserOrders(orderSortValue === `Все` ? `` : String(orderSortValue)), {
    select: ({ data }) => data.map((order): IUserTableItem => ({
      _id: order._id,
      items: [order._id, convertMongoDbData(order.createdAt), order.status, order.address.street, order.payment],
      products: order.items,
    })),
    enabled: !!user,
    onError: (error) => {
      toastError(error, `Список заказов`);
    },
  });

  const { mutateAsync: cancelAsync } = useMutation(`cancel order`, (OrderId: string) => OrderService.cancelOrder(OrderId), {
    onError: (error) => {
      toastError(error, `Отмена заказа`);
    },
    onSuccess: () => {
      toastr.success(`Отмена заказа`, `Заказ успешно отменен`);
      queryData.refetch();
    },
  });

  return useMemo(() => ({
    ...queryData,
    cancelAsync,
  }), [queryData, cancelAsync]);
};
