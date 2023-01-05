import ProductList from '@/components/screens/admin/products/ProductList'
import { NextPageAuth } from '@/shared/types/auth.types'

const ProductListPage: NextPageAuth = () => {
  return <ProductList />
}

ProductListPage.isOnlyAdmin = true

export default ProductListPage