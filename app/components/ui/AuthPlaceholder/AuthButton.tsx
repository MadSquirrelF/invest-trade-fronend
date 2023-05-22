import { useDispatch } from 'react-redux';
import { setLogin, showModal } from '@/store/modal/modal.slice';

import styles from './AuthPlaceholder.module.scss';

const AuthButton = () => {
  const dispatch = useDispatch();
  const ShowLogin = () => {
    dispatch(setLogin());
    dispatch(showModal());
  };
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => ShowLogin()}>
      <span className={styles.btn}>Войти</span>
    </div>
  );
};

export default AuthButton;
