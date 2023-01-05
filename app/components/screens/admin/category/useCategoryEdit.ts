import { CategoryService } from "@/services/category.service";
import { getKeys } from "@/utils/object/getKeys";
import { toastError } from "@/utils/toastError";
import { getAdminUrl } from "config/url.config";
import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { ICategoryEditInput } from "./category-edit.interface";

export const useCategoryEdit = (setValue: UseFormSetValue<ICategoryEditInput>) => {
  const { push, query } = useRouter()

  const categoryId = String(query.id)

  const { isLoading } = useQuery(['category', categoryId], () => CategoryService.getById(categoryId), {
    onSuccess: ({ data }) => {
      getKeys(data).forEach(key => {
        setValue(key, data[key])
      })
    },
    onError(error) {
      toastError(error, 'get category')
    },
    enabled: !!query.id,
  })

  const { mutateAsync } = useMutation('update category', (data: ICategoryEditInput) => CategoryService.updateCategory(categoryId, data), {
    onError(error) {
      toastError(error, 'Update category')
    },
    onSuccess() {
      toastr.success('Редактирование категории', 'Обновлен успешно')
      push(getAdminUrl('categories'))
    },
  })

  const onSubmit: SubmitHandler<ICategoryEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}