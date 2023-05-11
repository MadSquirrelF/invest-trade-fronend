import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import styles from './Cart.module.scss';
import Meta from '@/utils/meta/Meta';
import MaterialIcon from '@/components/ui/MaterialIcon';
import Button from '@/components/ui/form-elements/Button';
import { clearItems } from '@/store/cart/slice';
import { selectCart } from '@/store/cart/selectors';
import CartItem, { CartItemProps } from './CartItem';
import { useAuth } from '@/hooks/useAuth';
import { CartItemType } from '@/store/cart/types';
import emptyCart from '@/assets/images/commons/emptybusket.jpg';
import { useCart } from './useCart';
import Stepper from '@/components/ui/Stepper/Stepper';
import { IOrderEditAddress } from '@/shared/types/order.types';

import Field from '@/components/ui/form-elements/Field';

import deliveryImage from '@/assets/images/commons/delivery.jpg';
import paymentImage from '@/assets/images/commons/payment.jpg';

const Cart: FC = () => {
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(0);

  const { user } = useAuth();

  const { items } = useSelector(selectCart);

  const totalCount = items.reduce((sum: number, item: CartItemType) => sum + item.count, 0);

  const onClickClear = () => {
    dispatch(clearItems());
  };

  const {
    createAsync,
    mutateAsync,
  } = useCart();

  const {
    handleSubmit, register, formState: { errors },
  } = useForm<IOrderEditAddress>({
    mode: `onChange`,
  });

  const onSubmit: SubmitHandler<IOrderEditAddress> = async (data) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    if (localStorage.getItem(`lastCreatedOrderId`) === null) {
      if (items.length === 0) {
        setCurrentStep(0);
      } else {
        setCurrentStep(1);
      }
    } else if (!user) {
      setCurrentStep(1);
      localStorage.removeItem(`lastCreatedOrderId`);
    } else {
      setCurrentStep(2);
    }
  }, [items, user]);

  return (
    <Meta
      title="Корзина"
      description="Это ваша корзина. Укажите количество товара и скорее заказывайте!"
    >
      <section className={styles.cart}>
        <div className={styles.container}>
          <Stepper currentStep={currentStep} />

          {
            localStorage.getItem(`lastCreatedOrderId`) === null ? (
              <>
                <div className={styles.head}>
                  {
                    currentStep === 1 && user ? (
                      <h1>
                        Вы можете
                        {` `}
                        <br />
                        <span>создать заказ</span>
                      </h1>
                    ) : (
                      <h1>
                        Ваши
                        {` `}
                        <br />
                        <span>выбранные товары</span>
                      </h1>
                    )
                  }
                </div>
                <p>Это ваша корзина. Укажите количество товара и скорее заказывайте! Не забудьте авторизоваться!</p>
                <div className={styles.top}>
                  <h2 className={styles.title}>
                    <MaterialIcon name="MdShoppingBasket" />
                    Корзина
                  </h2>
                  <button
                    type="button"
                    disabled={items.length === 0}
                    className={styles.clearPage}
                    onClick={onClickClear}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 5H4.16667H17.5"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329
                   1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577
                    2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333
                     17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333
                      14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.33337 9.16667V14.1667"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.6666 9.16667V14.1667"
                        stroke="#B6B6B6"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span>Очистить корзину</span>
                  </button>
                </div>
                <div className={styles.items}>
                  {items.length === 0 ? (
                    <div className={styles.emptyCart}>
                      <Image
                        src={emptyCart}
                        alt="emptyCart"
                        draggable={false}
                        priority
                        height={300}
                        width={500}
                      />
                    </div>
                  ) : (items.map((item: CartItemProps) => (
                    <CartItem
                      key={item.id + item.name}
                      {...item}
                    />
                  )))}
                </div>
                <div className={styles.bottom}>
                  <div className={styles.details}>
                    <span>

                      Всего товара:
                      {` `}
                      <b>
                        {totalCount}
                        {` `}
                        шт.
                      </b>
                    </span>
                    {` `}
                    {
                      user ? <span>Стоимость по смете</span> : <span>Войдите в аккаунти, чтобы оформить заказ!</span>
                    }
                  </div>
                  <div className={styles.actions}>
                    <Link
                      href="/#shop"
                      className={styles.return}
                    >
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 13L1 6.93015L6.86175 1"
                          stroke="#D3D3D3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span>Вернуться назад</span>
                    </Link>
                    <Button
                      disabled={!user || items.length === 0}
                      // @ts-ignore
                      onClick={createAsync}
                    >
                      Оформить заказ
                    </Button>

                  </div>
                </div>
              </>
            ) : (
              <>
                <CSSTransition
                  in={currentStep === 2}
                  timeout={300}
                  classNames="popup-animation"
                  unmountOnExit
                >
                  <div className={styles.head}>
                    <h1>
                      Адресс
                      {` `}
                      <span>доставки</span>
                    </h1>
                    <p>
                      Укажите ваш адрес доставки или компании. Туда мы отправим ваш товар.
                    </p>
                  </div>

                </CSSTransition>
                <CSSTransition
                  in={currentStep === 3}
                  timeout={300}
                  classNames="popup-animation"
                  unmountOnExit
                >
                  <div className={styles.head}>
                    <h1>
                      Способ
                      {` `}
                      <span>оплаты</span>
                    </h1>
                    <p>
                      Укажите удобный для вас способ оплаты. Мы принимаем ниже представленные способы.
                    </p>
                  </div>
                </CSSTransition>

                <Button
                  onClick={() => setCurrentStep(2)}
                  disabled={currentStep === 2}
                  className={styles.roundBtn}
                >
                  <MaterialIcon name="MdKeyboardArrowLeft" />
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={currentStep === 3}
                  className={styles.roundBtn}
                >
                  <MaterialIcon name="MdKeyboardArrowRight" />
                </Button>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={styles.form}
                >
                  <CSSTransition
                    in={currentStep === 2}
                    timeout={300}
                    classNames="popup-animation"
                    unmountOnExit
                  >
                    <div className={styles.wrapper}>
                      <div className={styles.fields}>
                        <Field
                          {...register(`address.country`, {
                            required: true,
                            minLength: {
                              value: 1,
                              message: `Название не может содержать меньше 1 сим.!`,
                            },
                          })}
                          placeholder="Страна"
                          type="text"
                          error={errors.address?.country}
                          style={{
                            width: `100%`,
                          }}
                        />
                        <Field
                          {...register(`address.city`, {
                            required: true,
                            minLength: {
                              value: 1,
                              message: `Название не может содержать меньше 1 сим.!`,
                            },
                          })}
                          placeholder="Город"
                          type="text"
                          error={errors.address?.city}
                          style={{
                            width: `100%`,
                          }}
                        />
                        <Field
                          {...register(`address.street`, {
                            required: true,
                            minLength: {
                              value: 1,
                              message: `Название не может содержать меньше 1 сим.!`,
                            },
                          })}
                          placeholder="Улица"
                          type="text"
                          error={errors.address?.street}
                          style={{
                            width: `100%`,
                          }}
                        />
                      </div>
                      <div className={styles.imageContainer}>
                        <Image
                          src={deliveryImage}
                          alt="deliveryImage"
                          draggable={false}
                          priority
                          fill
                        />
                      </div>
                    </div>

                  </CSSTransition>
                  <CSSTransition
                    in={currentStep === 3}
                    timeout={300}
                    classNames="popup-animation"
                    unmountOnExit
                  >
                    <div className={styles.wrapper}>
                      <div className={styles.check}>
                        <div
                          className={styles.optionCheck}
                        >
                          <input
                            {...register(`payment`, { required: true })}
                            type="radio"
                            name="payment"
                            value="Наличные"
                            className={styles.checkInput}
                            id="cash"
                          />
                          <label htmlFor="cash">
                            <MaterialIcon name="MdAttachMoney" />
                            <span>Наличные</span>

                          </label>
                        </div>
                        <div
                          className={styles.optionCheck}
                        >
                          <input
                            {...register(`payment`, { required: true })}
                            type="radio"
                            name="payment"
                            value="По карте"
                            className={styles.checkInput}
                            id="card"
                          />
                          <label htmlFor="card">
                            <MaterialIcon name="MdAddCard" />
                            <span>По карте</span>

                          </label>
                        </div>
                        <div
                          className={styles.optionCheck}
                        >
                          <input
                            {...register(`payment`, { required: true })}
                            type="radio"
                            name="payment"
                            value="Бизнес перевод"
                            className={styles.checkInput}
                            id="transfer"
                          />
                          <label htmlFor="transfer">
                            <MaterialIcon name="MdOutlineAssignment" />
                            <span>Бизнес перевод</span>

                          </label>
                        </div>

                        <Button>Подтвердить</Button>
                      </div>
                      <div className={styles.imageContainer}>
                        <Image
                          src={paymentImage}
                          alt="paymentImage"
                          draggable={false}
                          priority
                          fill
                        />
                      </div>
                    </div>
                  </CSSTransition>

                </form>
              </>
            )
          }

        </div>
      </section>
    </Meta>
  );
};

export default Cart;
