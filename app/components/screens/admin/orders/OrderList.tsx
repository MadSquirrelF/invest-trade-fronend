import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import cn from 'classnames';
import { useRouter } from 'next/router';
import styles from '../../Order/Orders.module.scss';
import MaterialIcon from '@/components/ui/MaterialIcon';
import SkeletonLoader from '@/components/ui/heading/SkeletonLoader';
import { setOrderSortValue } from '@/store/filter/slice';
import { OrderSort } from '../../Order/OrderSort/OrderSort';
import { selectFilter } from '@/store/filter/selectors';

import { useGetAllOrders } from './useGetAllOrders';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import Heading from '@/components/ui/heading/Heading';

const OrderList: FC = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const {
    isLoading, data, cancelAsync, deleteAsync,
  } = useGetAllOrders();

  const [isProductOpen, setIseProductOpen] = useState(``);

  const { orderSortValue } = useSelector(selectFilter);

  const cancelOrder = (id: string) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Вы точно хотите отменить данный заказ?`)) {
      cancelAsync(id);
    }
  };

  const deleteOrder = (id: string) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Вы точно хотите удалить данный заказ?`)) {
      deleteAsync(id);
    }
  };

  const onChangeSort = useCallback((idx: string) => {
    dispatch(setOrderSortValue(idx));
  }, []);

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <AdminNavigation />
        <Heading title="Все заказы" />
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
              Имя
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

                      index === 3 ? (
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
                        disabled={tableItem.items[3] === `Отменен`}
                        onClick={() => cancelOrder(tableItem._id)}
                        className={styles.delete}
                      >
                        <MaterialIcon name="MdFreeCancellation" />
                      </button>
                      <button
                        type="button"
                        className={styles.delete}
                        onClick={() => deleteOrder(tableItem._id)}
                      >
                        <MaterialIcon name="MdDeleteForever" />
                      </button>
                      <button
                        type="button"
                        className={styles.watch}
                        onClick={() => setIseProductOpen(tableItem._id)}
                      >
                        <MaterialIcon name="MdRemoveRedEye" />
                      </button>
                      <button
                        type="button"
                        className={styles.watch}
                        onClick={() => push(tableItem.editUrl)}
                      >
                        <MaterialIcon name="MdContentPasteSearch" />
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

export default OrderList;
