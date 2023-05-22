/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRouter } from 'next/router';
import { FC } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { ICategoryItem } from './useCategories';
import styles from './CategoryItems.module.scss';
import { setBrandId, setCategoryId, setCurrentPage } from '@/store/filter/slice';
import { selectFilter } from '@/store/filter/selectors';

const MenuItem: FC<{ item: ICategoryItem }> = ({ item }) => {
  const dispatch = useDispatch();

  const { categoryIds } = useSelector(selectFilter);
  const { push } = useRouter();

  const dispatchCategory = () => {
    dispatch(setCategoryId(item._id));
    dispatch(setBrandId(``));
    push(`/#shop`);
    dispatch(setCurrentPage(1));
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={cn(styles.li, { [styles.active]: item._id === categoryIds })}
      onClick={() => dispatchCategory()}
    >
      <div className={styles.image}>
        <Image
          src={item.image}
          alt="CategoryImage"
          height={40}
          width={40}
          draggable={false}
          priority
        />
      </div>
      <h3>{item.name}</h3>
      <hr />
    </li>
  );
};

export default MenuItem;
