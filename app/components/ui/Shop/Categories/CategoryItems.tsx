import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import styles from './CategoryItems.module.scss';
import CategoryItem from './CategoryItem';
import { ICategoryItem } from './useCategories';

import MaterialIcon from '../../MaterialIcon';
import { setCategoryId } from '@/store/filter/slice';

const CategoryItems: FC<{ items: ICategoryItem[] }> = ({ items }) => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(true);
  const [showCategories, setshowCategories] = useState(false);

  return (
    <div className={styles.categories}>
      <CSSTransition
        in={showCategories}
        classNames="slide-animation"
        timeout={300}
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <ul>
          {items.map((item) => (
            <CategoryItem
              key={item._id}
              item={item}
            />
          ))}
          <li
            className={styles.li}
            onClick={() => setshowCategories(false)}
          >
            <MaterialIcon name="MdClear" />
          </li>
        </ul>
      </CSSTransition>
      {showButton && (
        <div
          className={styles.showButton}
          onClick={() => setshowCategories(true)}
        >
          <div className={styles.image}>
            <MaterialIcon name="MdDehaze" />
          </div>
          <h3>Категории</h3>
        </div>
      )}

    </div>

  );
};

export default CategoryItems;
