import { useDebounce } from "@/hooks/useDebounce"
import { NewService } from "@/services/new.service"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "config/url.config"
import { toastr } from "react-redux-toastr"
import { toastError } from "@/utils/toastError"
import { useRouter } from "next/router"
import { convertMongoDbData } from "@/utils/date/ConvertMongoDbData"

export const useNew = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)


  const queryData = useQuery(['new list', debouncedSearch], () =>
    NewService.getAll(debouncedSearch), {
    select: ({ data }) => data.map((news): ITableItem => ({
      _id: news._id,
      editUrl: getAdminUrl(`new/edit/${news._id}`),
      items: [news.title, convertMongoDbData(news.createdAt), news.username, news.countOpened],
    })),
    onError: (error) => {
      toastError(error, 'Список новостей')
    }
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const { push } = useRouter()
  const { mutateAsync: createAsync } = useMutation('create new', () =>
    NewService.createNew(), {
    onError: (error) => {
      toastError(error, 'Создание новостей')
    },
    onSuccess: ({ data: _id }) => {
      toastr.success('Создание новостей', 'новость успешно создана')
      push(getAdminUrl(`new/edit/${_id}`))
    }
  })

  const { mutateAsync: deleteAsync } = useMutation('delete new', (NewId: string) =>
    NewService.deleteNew(NewId), {
    onError: (error) => {
      toastError(error, 'Удаление новостей')
    },
    onSuccess: () => {
      toastr.success('Удаление новостей', 'новость успешно удалена')
      queryData.refetch()
    }
  })
  return useMemo(() => ({
    handleSearch, ...queryData, searchTerm, deleteAsync, createAsync
  }), [queryData, searchTerm, deleteAsync, createAsync])
}