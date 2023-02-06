import { useDebounce } from "@/hooks/useDebounce"
import { AddService } from "@/services/add.service"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "config/url.config"
import { toastr } from "react-redux-toastr"
import { toastError } from "@/utils/toastError"
import { useRouter } from "next/router"

export const useAdd = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(['add list', debouncedSearch], () =>
    AddService.getAll(debouncedSearch), {
    select: ({ data }) => data.map((add): ITableItem => ({
      _id: add._id,
      editUrl: getAdminUrl(`add/edit/${add._id}`),
      items: [add.name, String(add.price)]
    })),
    onError: (error) => {
      toastError(error, 'Список брендов')
    }
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const { push } = useRouter()
  const { mutateAsync: createAsync } = useMutation('create add', () =>
    AddService.createAdd(), {
    onError: (error) => {
      toastError(error, 'Создание добавки')
    },
    onSuccess: ({ data: _id }) => {
      toastr.success('Создание добавки', 'добавка успешно создана')
      push(getAdminUrl(`add/edit/${_id}`))
    }
  })

  const { mutateAsync: deleteAsync } = useMutation('delete add', (AddId: string) =>
    AddService.deleteAdd(AddId), {
    onError: (error) => {
      toastError(error, 'Удаление добавки')
    },
    onSuccess: () => {
      toastr.success('Удаление добавки', 'Добавки успешно удален')
      queryData.refetch()
    }
  })
  return useMemo(() => ({
    handleSearch, ...queryData, searchTerm, deleteAsync, createAsync
  }), [queryData, searchTerm, deleteAsync, createAsync])
}