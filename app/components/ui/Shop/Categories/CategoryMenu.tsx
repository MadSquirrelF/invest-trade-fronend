import { FC } from 'react'

import CategoryItems from './CategoryItems'
import { useCategories } from './useCategories'

const CategoryMenu: FC = () => {

  const { isLoading, data } = useCategories()


  return isLoading ? (
    <CategoryItems
      items={[]}
    />
  ) : (
    <CategoryItems
      items={data || []}
    />
  )
}

export default CategoryMenu