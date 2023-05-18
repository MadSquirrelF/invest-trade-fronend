import { useRouter } from "next/router";
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from "react-query";
import { getAdminUrl } from "config/url.config";
import { toastr } from "react-redux-toastr";
import { OrderService } from "@/services/order.service";
import { toastError } from "@/utils/toastError";
import { IOrderEditAdmin } from "@/shared/types/order.types";

export const useOrderEdit = () => {
  const { push, query } = useRouter();

  const orderId = String(query.id);

  const { mutateAsync } = useMutation(`update order admin`, (data: IOrderEditAdmin) => OrderService.updateAdminOrder(orderId, data), {
    onError(error) {
      toastError(error, `Редактирование заказа`);
    },
    onSuccess() {
      toastr.success(`Редактирование заказа`, `Обновлен успешно`);
      push(getAdminUrl(`orders`));
    },
  });

  const onSubmit: SubmitHandler<IOrderEditAdmin> = async (data) => {
    await mutateAsync(data);
  };

  return {
    onSubmit,
  };
};
