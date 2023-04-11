import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './Cart.module.scss'
import MaterialIcon from '@/components/ui/MaterialIcon'
import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '@/store/cart/slice'
import { CartItem } from '@/store/cart/types'
import Button from '@/components/ui/form-elements/Button'



export type CartItemProps = {
  id: string
  name: string
  image: string
  brand: string
  category:string
  url: string
  count: number
};



const CartItem: FC<CartItemProps> = ({ id,name,image,brand,category,url,count}) => {

  const dispatch = useDispatch();
  
  const onClickPlus = () => {
    dispatch(addItem({id} as CartItem));
  };
  const onClickMinus = () => {
    dispatch(minusItem({id} as CartItem));
  };
  const onClickRemove = () => {
    dispatch(removeItem({id} as CartItem));
  };
  return (
    <div className={styles.item}>
      <div className={styles.imgContainer}>
        <Image src={image} alt={name} draggable={false} height={90} width={90}/>
      </div>
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>Категория: <b>{category}</b>, Производство: <b>{brand}</b> </p>
      </div>
      <div className={styles.count}>
        <Button  disabled={count === 1} onClick={onClickMinus} className={styles.minus}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E"></path>
            <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E"></path>
          </svg>
        </Button>
        <b>{count}</b>
        <Button onClick={onClickPlus} className={styles.plus}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z" fill="#EB5A1E"></path>
            <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z" fill="#EB5A1E"></path>
          </svg>
        </Button>
      </div>
      <div className={styles.price}>
         <b>N ₽</b>
      </div>
      <div className={styles.buttons}>
        <Link href={url} className={styles.option}><MaterialIcon name='MdVisibility' /></Link>
        <button className={styles.option} onClick={onClickRemove}>
        <MaterialIcon name='MdClose' />
        </button>
      </div>
    </div>
  )
}

export default CartItem