import { FC, useCallback, useState } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import styles from './Orders.module.scss';
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader';

import { useOrder } from './useOrder';
import MaterialIcon from '@/components/ui/MaterialIcon';
import { setOrderSortValue } from '@/store/filter/slice';
import { OrderSort } from './OrderSort/OrderSort';
import { selectFilter } from '@/store/filter/selectors';

const Orders: FC = () => {
  const {
    isLoading, data, cancelAsync,
  } = useOrder();

  const dispatch = useDispatch();

  const [isProductOpen, setIseProductOpen] = useState(``);

  const { orderSortValue } = useSelector(selectFilter);

  const cancelOrder = (id: string) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Вы точно хотите отменить данный заказ?`)) {
      cancelAsync(id);
    }
  };

  const onChangeSort = useCallback((idx: string) => {
    dispatch(setOrderSortValue(idx));
  }, []);

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
        <div className={styles.statistic}>
          <OrderSort
            value={orderSortValue}
            onChangeSort={onChangeSort}
          />

          <span>
            {data?.length}
            <MaterialIcon name="MdOutlineDiscount" />
          </span>

        </div>
        <div className={styles.table}>
          <div className={cn(styles.info, styles.itemHeader)}>
            <div>
              ID
            </div>
            <div>
              Дата заказа
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
            <div>Действия</div>
          </div>
          {
            isLoading ? (
              <SkeletonLoader
                count={5}
                height={48}
                className="mt-4"
              />
            ) : data?.length ? data.map((tableItem) => (
              <div
                className={styles.item}
                key={tableItem._id}
              >
                <div className={styles.values}>
                  <div className={styles.nameContainer}>
                    <h5>
                      ID
                    </h5>
                    <h5>
                      Дата заказа
                    </h5>
                    <h5>
                      Статус
                    </h5>
                    <h5>
                      Пункт назначения
                    </h5>
                    <h5>
                      Способ оплаты
                    </h5>
                    <h5>Действия</h5>
                  </div>

                  <div className={styles.valueContainer}>
                    {tableItem.items.map((value, index) => (

                      index === 2 ? (
                        <div
                          key={value}
                          style={{
                            display: `flex`,
                            alignItems: `center`,
                            gap: `10px`,
                          }}
                          className={cn(styles.statusBlock, {
                            [styles.red]: value === `Отменен`,
                            [styles.yellow]: value === `В обработке` || value === `Ожидание`,
                            [styles.green]: value === `Завершен`,
                            [styles.blue]: value === `Выполняется`,
                          })}
                        >
                          <MaterialIcon
                            name="MdLens"
                          />
                          {value}
                        </div>
                      ) : (
                        <div
                          key={value}
                          className={styles.dataBlock}
                        >
                          {value}
                        </div>
                      )

                    ))}
                    <div className={styles.actions}>
                      <button
                        type="button"
                        disabled={tableItem.items[2] === `Отменен`}
                        onClick={() => cancelOrder(tableItem._id)}
                        className={styles.cancel}
                      >
                        Отменить
                      </button>
                      <button
                        type="button"
                        className={styles.watch}
                        onClick={() => setIseProductOpen(tableItem._id)}
                      >
                        <MaterialIcon name="MdRemoveRedEye" />
                      </button>
                    </div>
                  </div>

                </div>
                <div className={cn(styles.ShopItems, { [styles.active]: isProductOpen === tableItem._id })}>
                  {tableItem.products.map((product) => (
                    <div
                      className={styles.box}
                      key={product.id}
                    >
                      <div className={styles.image}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          draggable={false}
                          priority
                        />
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            )) : <div className={styles.notFound}>Заказов пока нет!</div>
          }
        </div>
      </div>
    </section>
  );
};

export default Orders;
