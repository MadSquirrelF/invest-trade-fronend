import { FC, useState } from 'react';

import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import cn from 'classnames';
import Image from 'next/image';
import styles from './OrderEdit.module.scss';
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation';
import MaterialIcon from '@/components/ui/MaterialIcon';
import Button from '@/components/ui/form-elements/Button';
import { convertMongoDbData } from '@/utils/date/ConvertMongoDbData';

import avatar from '@/assets/images/icons/avatar-svgrepo-com.svg';
import { useOrderEdit } from './useOrderEdit';
import { IOrderChangeStatus } from '@/shared/types/order.types';

export const statusArray = [`Ожидание`, `В обработке`, `Выполняется`, `Отменен`, `Завершен`];

const OrderEdit: FC = () => {
  const { query } = useRouter();

  const orderId = String(query.id);

  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const {
    data: order, isLoading, mutateAsync, deleteAsync,
  } = useOrderEdit();

  const changeStatus = (data: IOrderChangeStatus) => {
    mutateAsync(data);
    setIsStatusMenuOpen(false);
  };

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <AdminNavigation />
        <div className={styles.head}>
          <h1>
            Заказ номер:
            {` `}
            <span>{orderId}</span>
          </h1>
          <div className={styles.headerContainer}>
            {
              isLoading ? (<Skeleton width="200px" />) : (
                <span className={cn(styles.statusBlock, {
                  [styles.red]: order?.data.status === `Отменен`,
                  [styles.yellow]: order?.data.status === `В обработке` || order?.data.status === `Ожидание`,
                  [styles.green]: order?.data.status === `Завершен`,
                  [styles.blue]: order?.data.status === `Выполняется`,
                })}
                >
                  {order?.data.status}
                </span>
              )
            }
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.options}
                onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
              >
                <MaterialIcon name="MdMoreHoriz" />
              </button>
              {
                isStatusMenuOpen && (
                  <div className={styles.statusPopup}>
                    <ul>
                      {
                        statusArray.map((status) => (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                          <li
                            className={cn(styles.statusItem, {
                              [styles.red]: status === `Отменен`,
                              [styles.yellow]: status === `В обработке` || status === `Ожидание`,
                              [styles.green]: status === `Завершен`,
                              [styles.blue]: status === `Выполняется`,
                            })}
                            key={status}
                            onClick={() => changeStatus({ status })}

                          >
                            {status}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                )
              }
              <Button
                type="button"
                style={{
                  backgroundColor: `red`,
                }}
                className={styles.completeOrder}
                onClick={() => deleteAsync()}
              >
                Удалить заказ
              </Button>
            </div>

          </div>

        </div>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <div className={styles.mainHeader}>
              <h2>Данные заказа</h2>
              <div className={styles.dateCreated}>
                <MaterialIcon name="MdOutlineDateRange" />
                <span>{isLoading ? <Skeleton /> : convertMongoDbData(order?.data.createdAt ? order?.data.createdAt : ``)}</span>
              </div>
            </div>
            <hr />
            <div className={styles.productContainer}>
              {isLoading ? (
                <Skeleton
                  count={6}
                  height={150}
                />
              ) : order?.data.items.map((product) => (
                <div
                  className={styles.product}
                  key={product.id}
                >
                  <div className={styles.productImageContainer}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      draggable={false}
                      priority
                      fill
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h2>{product.name}</h2>
                    <p>
                      Категория:
                      {` `}
                      <span>{product.category}</span>

                      <br />
                      Производитель:
                      {` `}
                      <span>{product.brand}</span>

                    </p>
                  </div>
                  <div className={styles.quantity}>
                    <p>
                      Кол-во:
                      {` `}
                      <span>{product.count}</span>

                    </p>

                  </div>

                </div>
              ))}
            </div>

          </div>
          <div className={styles.user}>
            <div className={styles.userHeader}>
              <h2>Покупатель</h2>
            </div>
            <hr />
            <div className={styles.userInfo}>
              <div className={styles.avatarContainer}>
                {
                  order?.data.user.avatar
                    ? (
                      <Image
                        src={order?.data.user.avatar}
                        alt={order.data.user._id}
                        fill
                        priority
                        draggable={false}
                      />
                    ) : (
                      <Image
                        src={avatar}
                        alt="default avatar"
                        fill
                        priority
                        draggable={false}
                      />
                    )
                }

              </div>
              <h2>{order?.data.user.username}</h2>
              <p>{order?.data.user.sex}</p>
              <div className={styles.links}>
                <a href={`mailto:${order?.data.user.email}`}>{order?.data.user.email}</a>
                <a href={`telto:${order?.data.user.phone_number}`}>{order?.data.user.phone_number}</a>
              </div>

            </div>
            <hr />
            <div className={styles.adress}>
              <h3>Адрес доставки:</h3>
              <p>
                {order?.data.address.country}
                ,
                {` `}
                {order?.data.address.city}
                ,
                {` `}
                {order?.data.address.street}
              </p>
              <h3>Способ оплаты:</h3>
              <div className={styles.payment}>
                <MaterialIcon name="MdOutlineAttachMoney" />
                <span>{order?.data.payment}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default OrderEdit;
