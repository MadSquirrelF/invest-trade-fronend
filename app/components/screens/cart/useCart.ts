import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { toastr } from "react-redux-toastr";
import { getOrderUrl } from "config/url.config";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { toastError } from "@/utils/toastError";
import { OrderService } from "@/services/order.service";
import { selectCart } from "@/store/cart/selectors";
import { CartItemType } from "@/store/cart/types";
import { IOrderCreate } from "@/shared/types/order.types";

export const useCart = () => {
  const { push } = useRouter();

  const { items } = useSelector(selectCart);

  const totalCount = items.reduce((sum: number, item: CartItemType) => sum + item.count, 0);

  const orderValue: IOrderCreate = {
    items,
    total_count: totalCount,
  };

  const { mutateAsync: createAsync } = useMutation(`create order`, () => OrderService.createOrder(orderValue), {
    onError: (error) => {
      toastError(error, `Создание заказа`);
    },
    onSuccess: ({ data: _id }) => {
      toastr.success(`Создание заказа`, `Заказ успешно создан! Перенаправляем для уточнения деталей.`);
      push(getOrderUrl(`order/details/${_id}`));
    },
  });

  return useMemo(() => ({
    createAsync,
  }), [createAsync]);
};
