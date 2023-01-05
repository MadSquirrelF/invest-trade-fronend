import { UserService } from "@/services/user.service";
import { getKeys } from "@/utils/object/getKeys";
import { toastError } from "@/utils/toastError";
import { getAdminUrl } from "config/url.config";
import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toastr } from "react-redux-toastr";
import { IUserEditInput } from "./user-edit.interface";

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
  const { push, query } = useRouter()

  const userId = String(query.id)

  const { isLoading } = useQuery(['user', userId], () => UserService.getById(userId), {
    onSuccess: ({ data }) => {
      setValue('email', data.email)
      setValue('isAdmin', data.isAdmin)
    },
    onError(error) {
      toastError(error, 'get user')
    },
    enabled: !!query.id,
  })

  const { mutateAsync } = useMutation('update user', (data: IUserEditInput) => UserService.updateUser(userId, data), {
    onError(error) {
      toastError(error, 'Update user')
    },
    onSuccess() {
      toastr.success('Редактирование пользователя', 'Обновлен успешно')
      push(getAdminUrl('users'))
    },
  })

  const onSubmit: SubmitHandler<IUserEditInput> = async (data) => {
    await mutateAsync(data)
  }

  return { onSubmit, isLoading }
}