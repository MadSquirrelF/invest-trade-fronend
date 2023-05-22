import { useMutation } from "react-query";
import { toastr } from "react-redux-toastr";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toastError } from "@/utils/toastError";
import { OrderService } from "@/services/order.service";
import { selectCart } from "@/store/cart/selectors";
import { CartItemType } from "@/store/cart/types";
import { IOrderCreate, IOrderEditAddress } from "@/shared/types/order.types";
import { clearItems } from "@/store/cart/slice";

export const useCart = () => {
  const { items } = useSelector(selectCart);

  const dispatch = useDispatch();

  const totalCount = items.reduce((sum: number, item: CartItemType) => sum + item.count, 0);

  const orderValue: IOrderCreate = {
    items,
    total_count: totalCount,
  };

  const onClickClear = () => {
    dispatch(clearItems());
  };

  const { mutateAsync: createAsync } = useMutation(`create order`, () => OrderService.createOrder(orderValue), {
    onError: (error) => {
      toastError(error, `Создание заказа`);
    },
    onSuccess: ({ data: _id }) => {
      toastr.success(`Создание заказа`, `Заказ успешно создан! Перенаправляем для уточнения деталей.`);
      localStorage.setItem(`lastCreatedOrderId`, _id);
      onClickClear();
    },
  });

  const { push } = useRouter();

  // @ts-ignore
  const { mutateAsync } = useMutation(`update order`, (data: IOrderEditAddress) => OrderService.updateOrderUser(localStorage.getItem(`lastCreatedOrderId`), data), {
    onError(error) {
      toastError(error, `Ошибка оформления заказа`);
    },
    onSuccess() {
      toastr.success(`Оформление заказа`, `Оформление успешно завершено`);
      localStorage.removeItem(`lastCreatedOrderId`);
      push(`/orders`);
    },
  });

  return useMemo(() => ({
    createAsync,
    mutateAsync,
  }), [createAsync, mutateAsync]);
};
