import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { useDispatch } from 'react-redux';
import styles from './Favorites.module.scss';
import { IFavoriteItem } from './favorites.interface';
import FavoriteButton from '@/components/ui/Shop/FavoriteButton/FavoriteButton';
import MaterialIcon from '@/components/ui/MaterialIcon';
import { CartItemType } from '@/store/cart/types';
import { addItem } from '@/store/cart/slice';

const FavoriteItem: FC<{ item: IFavoriteItem }> = ({ item }) => {
  const dispatch = useDispatch();

  const onClickAdd = () => {
    const product: CartItemType = {
      id: item._id,
      name: item.name,
      image: item.image,
      category: item.category,
      brand: item.brand,
      count: 0,
      url: item.url,
    };
    dispatch(addItem(product));
  };
  return (
    <div className={styles.item}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={item.image}
            alt={item.name}
            draggable={false}
            height={100}
            width={100}
          />
        </div>
        <div className={styles.info}>
          <h3>{item.name}</h3>
          <p>
            Категория:
            <b>
              {` `}
              {item.category}
            </b>
            , Производство:
            <b>
              {` `}
              {item.brand}
            </b>
          </p>
        </div>
      </div>

      <div className={styles.buttons}>
        <FavoriteButton productId={item._id} />
        <Link
          href={item.url}
          className={styles.option}
        >
          <MaterialIcon name="MdVisibility" />
        </Link>
        <button
          type="button"
          className={styles.option}
          onClick={onClickAdd}
        >
          <MaterialIcon name="MdAddShoppingCart" />
        </button>
      </div>
    </div>
  );
};

export default FavoriteItem;
