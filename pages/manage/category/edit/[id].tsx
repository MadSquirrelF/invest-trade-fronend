import CategoryEdit from '@/components/screens/admin/category/CategoryEdit'
import { NextPageAuth } from '@/shared/types/auth.types'


const CategoryEditPage: NextPageAuth = () => {
  return <CategoryEdit />
}

CategoryEditPage.isOnlyAdmin = true

export default CategoryEditPage