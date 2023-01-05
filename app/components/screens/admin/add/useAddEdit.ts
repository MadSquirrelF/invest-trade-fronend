import { AddService } from "@/services/add.service";
import { getKeys } from "@/utils/object/getKeys";
import { toastError } from "@/utils/toastError";
import { getAdminUrl } from "config/url.config";
import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { IAddEditInput } from "./add-edit.interface";

export const useAddEdit = (setValue: UseFormSetValue<IAddEditInput>) => {
  const { push, query } = useRouter()

  const addId = String(query.id)

  const { isLoading } = useQuery(['add', addId], () => AddService.getById(addId), {
    onSuccess: ({ data }) => {
      getKeys(data).forEach(key => {
        setValue(key, data[key])
      })
    },
    onError(error) {
      toastError(error, 'get add')
    },
    enabled: !!query.id,
  })

  const { mutateAsync } = useMutation('update add', (data: IAddEditInput) => AddService.updateAdd(addId, data), {
    onError(error) {
      toastError(error, 'Update add')
    },
    onSuccess() {
      toastr.success('Редактирование добавки', 'Обновлен успешно')
      push(getAdminUrl('adds'))
    },
  })

  const onSubmit: SubmitHandler<IAddEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}