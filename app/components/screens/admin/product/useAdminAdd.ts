import { useQuery } from "react-query";
import { IOption } from "@/components/ui/select/select.interface";
import { AddService } from "@/services/add.service";
import { toastError } from "@/utils/toastError";

export const useAdminAdd = () => {
  const queryData = useQuery(`List of add`, () => AddService.getAll(), {
    select: ({ data }) => data.map((add): IOption => ({
      label: add.name,
      value: add._id,
    })),
    onError: (error) => {
      toastError(error, `Список добавок`);
    },
  });
  return queryData;
};
