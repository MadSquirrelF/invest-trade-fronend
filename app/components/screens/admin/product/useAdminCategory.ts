import { useQuery } from "react-query";
import { IOption } from "@/components/ui/select/select.interface";
import { CategoryService } from "@/services/category.service";
import { toastError } from "@/utils/toastError";

export const useAdminCategory = () => {
  const queryData = useQuery(`List of category`, () => CategoryService.getAll(), {
    select: ({ data }) => data.map((category): IOption => ({
      label: category.name,
      value: category._id,
    })),
    onError: (error) => {
      toastError(error, `Список категорий`);
    },
  });
  return queryData;
};
