import { FC } from 'react';
import cn from 'classnames';

import styles from './Orders.module.scss';
import SearchField from '@/components/ui/SearchField/SearchField';
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader';

import { useOrder } from './useOrder';

const Orders: FC = () => {
  const {
    handleSearch, isLoading, searchTerm, data, cancelAsync,
  } = useOrder();

  console.log(data);
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <div className={styles.head}>
          <h1>
            Ваши
            {` `}
            <span>Заказы</span>
          </h1>
          <p>
            На этой странице вы можете отслеживать статус ваших заказов и их данные.
          </p>
        </div>
        <div className={styles.header}>
          <SearchField
            searchTerm={searchTerm}
            handleSearch={handleSearch}
          />
        </div>
        <div className={styles.table}>
          <div className={cn(styles.info, styles.itemHeader)}>
            <div>
              ID
            </div>
            <div>
              Время заказа
            </div>
            <div>
              Статус
            </div>
            <div>
              Пункт назначения
            </div>
            <div>
              Способ оплаты
            </div>
            <div>Посмотреть</div>
          </div>
          {
            isLoading ? (
              <SkeletonLoader
                count={1}
                height={48}
                className="mt-4"
              />
            ) : data?.length ? data.map((tableItem) => (
              <div className={styles.item}>
                <div className={styles.info}>
                  {tableItem.items.map((value) => (
                    <div key={value}>
                      {value}
                    </div>

                  ))}
                  <div className={styles.actions}>
                    <button
                      type="button"
                      disabled={tableItem.items[2] === `Заказ отменен`}
                      onClick={() => cancelAsync(tableItem._id)}
                    >
                      Отменить заказ
                    </button>
                  </div>
                </div>
              </div>
            )) : <div className={styles.notFound}>Данных пока нет</div>
          }
        </div>
      </div>
    </section>
  );
};

export default Orders;
