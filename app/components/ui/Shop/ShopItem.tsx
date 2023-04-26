import React, { FC } from 'react'
import styles from './Shop.module.scss';
import Image from 'next/image';
import MaterialIcon from '../MaterialIcon';
import { stripHtml } from 'string-strip-html';
import { addItem } from '@/store/cart/slice';
import Link from 'next/link';
import { getProductUrl } from 'config/url.config';
import FavoriteButton from './FavoriteButton/FavoriteButton';
import { IProduct } from '@/shared/types/product.types';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { CartItem } from '@/store/cart/types';


const ShopItem: FC<{item:IProduct }> = ({item}) => {

  const dispatch = useDispatch();
  
  const onClickAdd = () => {
    const product: CartItem = {
      id: item._id,
      name: item.title,
      image: item.image,
      category: item.category[0].name,
      brand: item.brand[0].name,
      count: 0,
      url: item.slug
    };
    dispatch(addItem(product));
  };
  return (
    <div key={item.slug} className={styles.item}>
              <div className={styles.brand}>
                <Image src={item.brand[0].logo_image} alt={item.slug} draggable={false} width={90} height={50} />
              </div>
              <div className={styles.horizontal}>
                <div className={styles.box}>
                  <div className={cn(styles.circle, { [styles.red]: item.is_available === false, [styles.blue]: item.is_available === true })}>
                    {item.is_available === true ? <MaterialIcon name='MdAssignmentTurnedIn' /> : <MaterialIcon name='MdAssignmentLate' />}
                  </div>
                  <h3>{item.is_available === true ? 'В Наличии' : 'Распродан'} </h3>
                </div>
                <div className={styles.box}>
                  <div className={cn(styles.circle, styles.blueGradient)}>

                    <h6>{item.count_on_store}</h6>

                  </div>
                  <h3>Доступно</h3>
                </div>
                <div className={styles.box}>
                  <div className={cn(styles.circle, styles.blackGradient)}>
                    <h5>{item.countOpened}</h5>
                  </div>
                  <h3>Просмотров</h3>
                </div>

              </div>

              <div className={styles.rating}>
                <MaterialIcon name="MdStarRate" />
                <span>{item.rating.toFixed(1)}</span>
              </div>

              <div className={styles.topFlex}>
                <div className={styles.image}>
                  <Link href={getProductUrl(item.slug)} >
                    <Image src={item.image} alt={item.title} fill draggable={false} />
                  </Link>
                </div>
              </div>
              <div className={styles.content}>
                <h2>{item.title}</h2>
                <h4>{item.category[0].name}</h4>
                <p>{stripHtml(item.description_short).result}</p>

              </div>
              <div className={styles.cart}>
                <div className={styles.cartAdd}>
                  <button disabled={item.is_available === false}
                  onClick={onClickAdd}
                   className={styles.btn}>
                    <span>Добавить</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                        stroke="blue"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                        stroke="blue"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                        stroke="blue"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <FavoriteButton productId={item._id} />
                <Link href={getProductUrl(item.slug)} className={styles.button}><MaterialIcon name='MdSegment' /></Link>

              </div>
            </div>
  )
}

export default ShopItem