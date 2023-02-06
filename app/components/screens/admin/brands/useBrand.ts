import { useDebounce } from "@/hooks/useDebounce"
import { BrandService } from "@/services/brand.service"
import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { ITableItem } from "@/components/ui/admin-table/AdminTable/admin-table.interface"
import { getAdminUrl } from "config/url.config"
import { toastr } from "react-redux-toastr"
import { toastError } from "@/utils/toastError"
import { useRouter } from "next/router"

export const useBrand = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(['brand list', debouncedSearch], () =>
    BrandService.getAll(debouncedSearch), {
    select: ({ data }) => data.map((brand): ITableItem => ({
      _id: brand._id,
      editUrl: getAdminUrl(`brand/edit/${brand._id}`),
      items: [brand.name]
    })),
    onError: (error) => {
      toastError(error, 'Список брендов')
    }
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const { push } = useRouter()
  const { mutateAsync: createAsync } = useMutation('create brand', () =>
    BrandService.createBrand(), {
    onError: (error) => {
      toastError(error, 'Создание бренда')
    },
    onSuccess: ({ data: _id }) => {
      toastr.success('Создание бренда', 'бренд успешно создан')
      push(getAdminUrl(`brand/edit/${_id}`))
    }
  })

  const { mutateAsync: deleteAsync } = useMutation('delete brand', (BrandId: string) =>
    BrandService.deleteBrand(BrandId), {
    onError: (error) => {
      toastError(error, 'Удаление бренда')
    },
    onSuccess: () => {
      toastr.success('Удаление бренда', 'бренд успешно удален')
      queryData.refetch()
    }
  })
  return useMemo(() => ({
    handleSearch, ...queryData, searchTerm, deleteAsync, createAsync
  }), [queryData, searchTerm, deleteAsync, createAsync])
}