import { FC, memo } from 'react';
import cn from 'classnames';
import styles from '../Orders.module.scss';

const sortValues = [`Все`, `Ожидание`, `В обработке`, `Выполняется`, `Отменен`, `Завершен`];

type SortProps = {
  value: string;
  onChangeSort: (value: string) => void;
};

export const OrderSort: FC<SortProps> = memo(({ value, onChangeSort }) => (
  <ul className={styles.sort}>
    {
      sortValues.map((sortName, index) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
        <li
          key={index}
          onClick={() => onChangeSort(sortName)}
          className={cn(styles.sortItem, { [styles.active]: value === sortName })}
        >
          {sortName}
        </li>
      ))
    }
  </ul>
));
