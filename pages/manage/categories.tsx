import CategoryList from '@/components/screens/admin/categories/CategoryList'
import { NextPageAuth } from '@/shared/types/auth.types'


const CategoryListPage: NextPageAuth = () => {
  return <CategoryList />
}

CategoryListPage.isOnlyAdmin = true

export default CategoryListPage