import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { useMemo } from "react";
import { getAdminUrl } from "config/url.config";
import { OrderService } from "@/services/order.service";
import { toastError } from "@/utils/toastError";
import { IOrderChangeStatus } from "@/shared/types/order.types";

export const useOrderEdit = () => {
  const { push, query } = useRouter();

  const orderId = String(query.id);

  const order = useQuery(`admin find one order`, () => OrderService.getOrderById(orderId), {
    onSuccess: ({ data }) => data,
    onError(error) {
      toastError(error, `get order by id`);
    },
    enabled: !!query.id,
  });

  const { mutateAsync } = useMutation(`change order status`, (data: IOrderChangeStatus) => OrderService.changeOrderStatus(orderId, data), {
    onError(error) {
      toastError(error, `Изменение статуса заказа`);
    },
    onSuccess() {
      toastr.success(`Изменение статуса заказа`, `Статус изменен успешно`);
      order.refetch();
    },
  });

  const { mutateAsync: deleteAsync } = useMutation(`delete admin order`, () => OrderService.deleteOrder(orderId), {
    onError(error) {
      toastError(error, `Удаление заказа админом`);
    },
    onSuccess() {
      toastr.success(`Удаление заказа админом`, `Заказ удален админом`);
      push(getAdminUrl(`orders`));
    },
  });

  return useMemo(() => ({
    ...order,
    mutateAsync,
    deleteAsync,
  }), [mutateAsync, order, deleteAsync]);
};
