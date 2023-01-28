import Cart from '@/components/ui/Cart/Cart'
import { NextPageAuth } from '@/shared/types/auth.types'


const CartPage: NextPageAuth = () => {
  return (
    <Cart />
  )
}

CartPage.isOnlyUser = true

export default CartPage