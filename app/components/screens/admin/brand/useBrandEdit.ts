import { BrandService } from "@/services/brand.service";
import { getKeys } from "@/utils/object/getKeys";
import { toastError } from "@/utils/toastError";
import { getAdminUrl } from "config/url.config";
import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { IBrandEditInput } from "./brand-edit.interface";

export const useBrandEdit = (setValue: UseFormSetValue<IBrandEditInput>) => {
  const { push, query } = useRouter()

  const brandId = String(query.id)

  const { isLoading } = useQuery(['brand', brandId], () => BrandService.getById(brandId), {
    onSuccess: ({ data }) => {
      getKeys(data).forEach(key => {
        setValue(key, data[key])
      })
    },
    onError(error) {
      toastError(error, 'get brand')
    },
    enabled: !!query.id,
  })

  const { mutateAsync } = useMutation('update brand', (data: IBrandEditInput) => BrandService.updateBrand(brandId, data), {
    onError(error) {
      toastError(error, 'Update brand')
    },
    onSuccess() {
      toastr.success('Редактирование бренда', 'Обновлен успешно')
      push(getAdminUrl('brands'))
    },
  })

  const onSubmit: SubmitHandler<IBrandEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}