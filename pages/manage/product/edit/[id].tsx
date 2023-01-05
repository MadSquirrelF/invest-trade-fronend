import ProductEdit from '@/components/screens/admin/product/ProductEdit'
import { NextPageAuth } from '@/shared/types/auth.types'


const ProductEditPage: NextPageAuth = () => {
  return <ProductEdit />
}

ProductEditPage.isOnlyAdmin = true

export default ProductEditPage