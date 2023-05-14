import Link from 'next/link';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import LoginFields from '@/components/layout/Navigation/MenuContainer/auth/LoginFileds';
import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { hideModal } from '@/store/modal/modal.slice';
import Button from '../form-elements/Button';
import Heading from '../heading/Heading';
import { ILoginInput } from './auth.interface';
import styles from './auth.module.scss';

const LoginModal: FC = () => {
  useAuthRedirect();

  const { isLoading } = useAuth();

  const {
    register: registerInput, handleSubmit, formState, reset,
  } = useForm<ILoginInput>({
    mode: `onChange`,
  });

  const { login } = useActions();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<ILoginInput> = (data) => {
    login(data);
    reset();
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading
          title="Вход на сайт"
          className="mb-1 text-4xl "
        />
        <h3>Для того, чтобы перейти к личным данным нужно войти</h3>

        <LoginFields
          formState={formState}
          register={registerInput}
          isPasswordRequired
        />

        <div className={styles.button}>
          <Button
            type="submit"
            disabled={isLoading}
          >
            Войти
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

export default LoginModal;
