import { FC } from 'react'
import styles from './Cart.module.scss'
import Meta from '@/utils/meta/Meta'
import MaterialIcon from '@/components/ui/MaterialIcon'
import Link from 'next/link'
import Button from '@/components/ui/form-elements/Button'
import CartEmpty from './CartEmpty/CartEmpty'
import { clearItems } from '@/store/cart/slice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCart } from '@/store/cart/selectors'
import CartItem, { CartItemProps } from './CartItem'
import { useAuth } from '@/hooks/useAuth'

const Cart: FC = () => {

  const dispatch = useDispatch();

  const { user } = useAuth();

  const { items } = useSelector(selectCart);
  
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  const onClickClear = () => {
    dispatch(clearItems());
  };

  if (items.length === 0) {
    return <CartEmpty />;
  }
  return (
    <Meta title="Избранное">
      <section className={styles.cart}>
        <div className={styles.container}>
        <div className={styles.head}>
            <h1>Ваши  <br />
              <span>выбранные товары</span>
            </h1>
          </div>
          <p>Это ваша корзина. Укажите количество товара и скорее заказывайте!</p>
          <div className={styles.top}>
            <h2 className={styles.title}>
              <MaterialIcon name='MdShoppingBasket'/>
              Корзина
            </h2>
            <div className={styles.clearPage} onClick={onClickClear}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 5H4.16667H17.5"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
              <path
                d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
              <path
                d="M8.33337 9.16667V14.1667"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
              <path
                d="M11.6666 9.16667V14.1667"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"></path>
            </svg>

            <span>Очистить избранное</span>
            </div>
          </div>
          <div className={styles.items}>
            {
              items.map((item:CartItemProps) => (
                <CartItem key={item.id + item.name} {...item}/>
              ))
            }
          </div>
          <div className={styles.bottom}>
            <div className={styles.details}>
              <span>
         
              Всего товара: <b>{totalCount} шт.</b>
              </span>
             {
              user ? <span>Стоимость по смете</span> : <span>Войдите в аккаунти, чтобы оформить заказ!</span>
             }
            </div>
            <div className={styles.actions}>
              <Link href={'/'} className={styles.return}>
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"></path>
              </svg>

              <span>Вернуться назад</span>
              </Link>
              <Button disabled={!user}>
                Оформить заказ
              </Button>
              
            </div>
          </div>
        </div>
      </section>
    </Meta>
  )
}

export default Cart

