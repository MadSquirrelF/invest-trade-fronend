import { useDebounce } from "@/hooks/useDebounce"
import { UserService } from "@/services/user.service"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "config/url.config"
import { convertMongoDbData } from "@/utils/date/ConvertMongoDbData"
import { toastr } from "react-redux-toastr"
import { toastError } from "@/utils/toastError"
export const useUsers = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(['user list', debouncedSearch], () =>
    UserService.getAll(debouncedSearch), {
    select: ({ data }) => data.map((user): ITableItem => ({
      _id: user._id,
      editUrl: getAdminUrl(`user/edit/${user._id}`),
      items: [user.email, convertMongoDbData(user.createdAt)]
    })),
    onError: (error) => {
      toastError(error, 'Список пользователей')
    }
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const { mutateAsync: deleteAsync } = useMutation('delete user', (UserId: string) =>
    UserService.deleteUser(UserId), {
    onError: (error) => {
      toastError(error, 'Удаление пользователя')
    },
    onSuccess: () => {
      toastr.success('Удаление пользователя', 'Пользователь успешно удален')
      queryData.refetch()
    }
  })
  return useMemo(() => ({
    handleSearch, ...queryData, searchTerm, deleteAsync
  }), [queryData, searchTerm, deleteAsync])
}