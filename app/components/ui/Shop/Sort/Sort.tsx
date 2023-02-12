import { setSort } from '@/store/filter/slice';
import { Sort as SortType, SortPropertyEnum, SortPropertyOrderEnum } from '@/store/filter/types';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Sort.module.scss'
import cn from 'classnames'
type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
  sortOrder: SortPropertyOrderEnum;
}
type PopupClick = MouseEvent & {
  path: Node[];
}

type SortPopupProps = {
  value: SortType;
};

export const list: SortItem[] = [
  { name: 'Высокие рейтинги ', sortProperty: SortPropertyEnum.RATING, sortOrder: SortPropertyOrderEnum.DESC },
  { name: 'Низкие рейтинги', sortProperty: SortPropertyEnum.RATING, sortOrder: SortPropertyOrderEnum.ASC },
  { name: 'Сначала популярные', sortProperty: SortPropertyEnum.COUNT, sortOrder: SortPropertyOrderEnum.DESC },
  { name: 'Сначала неизвестные ', sortProperty: SortPropertyEnum.COUNT, sortOrder: SortPropertyOrderEnum.ASC },
  { name: 'С конца: Я-А', sortProperty: SortPropertyEnum.TITLE, sortOrder: SortPropertyOrderEnum.DESC },
  { name: 'С начала: А-Я', sortProperty: SortPropertyEnum.TITLE, sortOrder: SortPropertyOrderEnum.ASC },
];

export const Sort: React.FC<SortPopupProps> = React.memo(function Sort({ value }) {

  const dispatch = useDispatch();

  const [isVisiblePopup, setVisiblePopup] = React.useState(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  const changeSort = (obj: SortItem) => {
    dispatch(setSort(obj));
    setVisiblePopup(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;

      if (sortRef.current && _event.path.includes(sortRef.current, 0) === false) {

        setVisiblePopup(false);
      }

    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.label}>
        <b>Сортировка:</b>
        <span onClick={() => setVisiblePopup(!isVisiblePopup)}>{value.name}</span>
      </div>
      {isVisiblePopup && (
        <div className={styles.popup}>
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => changeSort(obj)}
                className={cn(styles.item, { [styles.active]: value.sortProperty === obj.sortProperty && value.sortOrder === obj.sortOrder })}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )
      }
    </div >

  )

})


