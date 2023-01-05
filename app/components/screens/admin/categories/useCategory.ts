import { useDebounce } from "@/hooks/useDebounce"
import { CategoryService } from "@/services/category.service"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "config/url.config"
import { toastr } from "react-redux-toastr"
import { toastError } from "@/utils/toastError"
import { useRouter } from "next/router"

export const useCategory = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(['category list', debouncedSearch], () =>
    CategoryService.getAll(debouncedSearch), {
    select: ({ data }) => data.map((category): ITableItem => ({
      _id: category._id,
      editUrl: getAdminUrl(`category/edit/${category._id}`),
      items: [category.name, category.slug]
    })),
    onError: (error) => {
      toastError(error, 'Список категорий')
    }
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const { push } = useRouter()
  const { mutateAsync: createAsync } = useMutation('create category', () =>
    CategoryService.createCategory(), {
    onError: (error) => {
      toastError(error, 'Создание категории')
    },
    onSuccess: ({ data: _id }) => {
      toastr.success('Создание категории', 'категория успешно создана')
      push(getAdminUrl(`category/edit/${_id}`))
    }
  })

  const { mutateAsync: deleteAsync } = useMutation('delete category', (CategoryId: string) =>
    CategoryService.deleteCategory(CategoryId), {
    onError: (error) => {
      toastError(error, 'Удаление категории')
    },
    onSuccess: () => {
      toastr.success('Удаление категории', 'категория успешно удалена')
      queryData.refetch()
    }
  })
  return useMemo(() => ({
    handleSearch, ...queryData, searchTerm, deleteAsync, createAsync
  }), [queryData, searchTerm, deleteAsync, createAsync])
}