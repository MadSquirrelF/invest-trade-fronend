import { ChangeEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/hooks/useAuth";
import { convertMongoDbData } from "@/utils/date/ConvertMongoDbData";
import { toastError } from "@/utils/toastError";
import { OrderService } from "@/services/order.service";

export const useOrder = () => {
  const [searchTerm, setSearchTerm] = useState(``);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { user } = useAuth();

  interface IUserTableItem {
    _id: string;
    items: string[];
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const queryData = useQuery([`user orders list`, debouncedSearch], () => OrderService.getAllUserOrders(debouncedSearch), {
    select: ({ data }) => data.map((order): IUserTableItem => ({
      _id: order._id,
      items: [order._id, convertMongoDbData(order.createdAt), order.status, order.address.street, order.payment],
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
    handleSearch,
    ...queryData,
    searchTerm,
    cancelAsync,
  }), [queryData, searchTerm, cancelAsync]);
};
