import { useDebounce } from "@/hooks/useDebounce"
import { WorkService } from "@/services/work.service"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "config/url.config"
import { toastr } from "react-redux-toastr"
import { toastError } from "@/utils/toastError"
import { useRouter } from "next/router"
import { convertMongoDbData } from "@/utils/date/ConvertMongoDbData"

export const useWork = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(['work list', debouncedSearch], () =>
    WorkService.getAll(debouncedSearch), {
    select: ({ data }) => data.map((work): ITableItem => ({
      _id: work._id,
      editUrl: getAdminUrl(`work/edit/${work._id}`),
      items: [work.title, convertMongoDbData(work.createdAt)],
    })),
    onError: (error) => {
      toastError(error, 'Список портфолио')
    }
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const { push } = useRouter()
  const { mutateAsync: createAsync } = useMutation('create work', () =>
    WorkService.createWork(), {
    onError: (error) => {
      toastError(error, 'Создание портфолио')
    },
    onSuccess: ({ data: _id }) => {
      toastr.success('Создание портфолио', 'портфолио успешно создана')
      push(getAdminUrl(`work/edit/${_id}`))
    }
  })

  const { mutateAsync: deleteAsync } = useMutation('delete work', (WorkId: string) =>
    WorkService.deleteWork(WorkId), {
    onError: (error) => {
      toastError(error, 'Удаление портфолио')
    },
    onSuccess: () => {
      toastr.success('Удаление портфолио', 'портфолио успешно удалено')
      queryData.refetch()
    }
  })
  return useMemo(() => ({
    handleSearch, ...queryData, searchTerm, deleteAsync, createAsync
  }), [queryData, searchTerm, deleteAsync, createAsync])
}