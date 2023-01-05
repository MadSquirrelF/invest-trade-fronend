import { NewService } from "@/services/new.service";
import { getKeys } from "@/utils/object/getKeys";
import { toastError } from "@/utils/toastError";
import { getAdminUrl } from "config/url.config";
import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { INewEditInput } from "./new-edit.interface";

export const useNewEdit = (setValue: UseFormSetValue<INewEditInput>) => {
  const { push, query } = useRouter()

  const newId = String(query.id)

  const { isLoading } = useQuery(['new', newId], () => NewService.getById(newId), {
    onSuccess: ({ data }) => {
      getKeys(data).forEach(key => {
        setValue(key, data[key])
      })
    },
    onError(error) {
      toastError(error, 'get new')
    },
    enabled: !!query.id,
  })

  const { mutateAsync } = useMutation('update new', (data: INewEditInput) => NewService.updateNew(newId, data), {
    onError(error) {
      toastError(error, 'Update new')
    },
    onSuccess() {
      toastr.success('Редактирование новостей', 'Обновлен успешно')
      push(getAdminUrl('news'))
    },
  })

  const onSubmit: SubmitHandler<INewEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}