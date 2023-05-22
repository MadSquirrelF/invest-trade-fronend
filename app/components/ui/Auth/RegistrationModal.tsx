import Link from 'next/link';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import RegistrationFields from '@/components/layout/Navigation/MenuContainer/auth/RegistrationFields';
import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { hideModal } from '@/store/modal/modal.slice';
import Button from '../form-elements/Button';
import Heading from '../heading/Heading';
import { IRegistrationInput } from './auth.interface';
import styles from './auth.module.scss';

const RegistrationModal: FC = () => {
  useAuthRedirect();
  const dispatch = useDispatch();

  const { isLoading } = useAuth();

  const {
    register: registerInput, handleSubmit, formState, reset, control,
  } = useForm<IRegistrationInput>({
    mode: `onChange`,
  });

  const { register } = useActions();

  const onSubmit: SubmitHandler<IRegistrationInput> = (data) => {
    register(data);

    reset();
  };

  return (
    <div className={styles.containerReg}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading
          title="Регистрация"
          className="mb-1 text-4xl text-primary"
        />
        <h3 style={{ fontSize: `16px` }}>
          Мы не используем ваш номер телефона и почту для рекламы и рассылок нашей компании. Эти данные буду
          использоваться только для того, чтобы связаться с вами при оформлении заказа!
        </h3>

        <RegistrationFields
          formState={formState}
          control={control}
          register={registerInput}
          isPasswordRequired
        />

        <div className={styles.button}>
          <Button
            type="submit"
            disabled={isLoading}
          >
            Регистрация
          </Button>
        </div>

        <p>
          Продолжая, вы соглашаетесь
          <Link
            href="/privacy"
            onClick={() => dispatch(hideModal())}
          >
            со сбором и обработкой персональных данных и пользовательским соглашением
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationModal;
