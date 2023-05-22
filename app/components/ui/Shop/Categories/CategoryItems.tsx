import { FC, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './CategoryItems.module.scss';
import CategoryItem from './CategoryItem';
import { ICategoryItem } from './useCategories';

import MaterialIcon from '../../MaterialIcon';

const CategoryItems: FC<{ items: ICategoryItem[] }> = ({ items }) => {
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

          >
            <button
              type="button"
              onClick={() => setshowCategories(false)}
            >
              <MaterialIcon name="MdClear" />
            </button>

          </li>
        </ul>
      </CSSTransition>
      {showButton && (
        <button
          type="button"
          className={styles.showButton}
          onClick={() => setshowCategories(true)}
        >
          <div className={styles.image}>
            <MaterialIcon name="MdDehaze" />
          </div>
          <h3>Категории</h3>
        </button>
      )}

    </div>

  );
};

export default CategoryItems;
