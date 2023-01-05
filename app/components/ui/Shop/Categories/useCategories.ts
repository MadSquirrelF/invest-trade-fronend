import { useQuery } from 'react-query'

import { CategoryService } from '@/services/category.service'
import { toastError } from '@/utils/toastError'

export interface ICategoryItem {
  _id: string
  name: string
  image: string
}
export const useCategories = () => {
  const queryData = useQuery(
    'get all categories',
    () => CategoryService.getAll(),
    {
      select: ({ data }) =>
        data
          .map(
            (category): ICategoryItem => ({
              image: category.image,
              _id: category._id,
              name: category.name,
            })
          )
          .splice(0, 6),
      onError(error) {
        toastError(error, 'Ошибка получения категорий')
      },
    }
  )

  return queryData
}
