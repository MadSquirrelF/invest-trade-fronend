import { ProductService } from "@/services/product.service";
import { getKeys } from "@/utils/object/getKeys";
import { toastError } from "@/utils/toastError";
import { getAdminUrl } from "config/url.config";
import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { IProductEditInput } from "./product-edit.interface";

export const useProductEdit = (setValue: UseFormSetValue<IProductEditInput>) => {
  const { push, query } = useRouter()

  const productId = String(query.id)

  const { isLoading } = useQuery(['product', productId], () => ProductService.getById(productId), {
    onSuccess: ({ data }) => {
      getKeys(data).forEach(key => {
        setValue(key, data[key])
      })
    },
    onError(error) {
      toastError(error, 'get product')
    },
    enabled: !!query.id,
  })

  const { mutateAsync } = useMutation('update product', (data: IProductEditInput) => ProductService.updateProduct(productId, data), {
    onError(error) {
      toastError(error, 'Update product')
    },
    onSuccess() {
      toastr.success('Редактирование товара', 'Обновлен успешно')
      push(getAdminUrl('products'))
    },
  })

  const onSubmit: SubmitHandler<IProductEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}