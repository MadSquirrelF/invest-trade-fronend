import { useQuery } from "react-query";
import { IOption } from "@/components/ui/select/select.interface";
import { BrandService } from "@/services/brand.service";
import { toastError } from "@/utils/toastError";

export const useAdminBrand = () => {
  const queryData = useQuery(`List of brand`, () => BrandService.getAll(), {
    select: ({ data }) => data.map((brand): IOption => ({
      label: brand.name,
      value: brand._id,
    })),
    onError: (error) => {
      toastError(error, `Список брендов`);
    },
  });
  return queryData;
};
