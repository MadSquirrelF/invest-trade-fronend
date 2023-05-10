import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toastr } from 'react-redux-toastr';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import styles from './Order.module.scss';
import Stepper from '@/components/ui/Stepper/Stepper';
import Field from '@/components/ui/form-elements/Field';
import { IOrderEditAddress } from '@/shared/types/order.types';
import { toastError } from '@/utils/toastError';
import { OrderService } from '@/services/order.service';
import Button from '@/components/ui/form-elements/Button';
import deliveryImage from '@/assets/images/commons/delivery.jpg';
import paymentImage from '@/assets/images/commons/payment.jpg';
import MaterialIcon from '@/components/ui/MaterialIcon';

const OrderEdit: FC = () => {
  const {
    handleSubmit, register, formState: { errors },
  } = useForm<IOrderEditAddress>({
    mode: `onChange`,
  });

  const [currentStep, setCurrentStep] = useState(2);

  const { query } = useRouter();

  const orderId = String(query.id);

  const { mutateAsync } = useMutation(`update order`, (data: IOrderEditAddress) => OrderService.updateOrderUser(orderId, data), {
    onError(error) {
      toastError(error, `Ошибка обновления профиля`);
    },
    onSuccess() {
      toastr.success(`Редактирование профиля`, `Обновлен успешно`);
    },
  });

  const onSubmit: SubmitHandler<IOrderEditAddress> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <Stepper currentStep={currentStep} />

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
                  className={styles.option}
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
                  className={styles.option}
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
                  className={styles.option}
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

      </div>

    </section>
  );
};

export default OrderEdit;
