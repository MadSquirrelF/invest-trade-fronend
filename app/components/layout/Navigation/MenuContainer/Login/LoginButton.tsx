import {
  FC, useState, MouseEvent, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';
import { getAdminHomeUrl } from 'config/url.config';
import { setLogin, setRegistration, showModal } from '@/store/modal/modal.slice';
import avatar from '@/assets/images/icons/avatar-svgrepo-com.svg';
import MaterialIcon from '@/components/ui/MaterialIcon';
import { useAuth } from '@/hooks/useAuth';
import { useActions } from '@/hooks/useActions';
import styles from './Login.module.scss';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

const LoginButton: FC = () => {
  const [activedrop, setActiveDrop] = useState(false);
  const dispatch = useDispatch();
  const ShowLogin = () => {
    dispatch(setLogin());
    dispatch(showModal());
    setActiveDrop(false);
  };
  const ShowRegistration = () => {
    dispatch(setRegistration());
    dispatch(showModal());
    setActiveDrop(false);
  };
  const { logout } = useActions();

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };

  const { user } = useAuth();
  const ref = useRef(null);
  useOnClickOutside(ref, () => setActiveDrop(false));

  return (
    <div
      className={styles.login}
      ref={ref}
    >
      <button
        type="button"
        className={styles.menu}
        onClick={() => setActiveDrop(!activedrop)}

      >
        {user ? (
          <>
            <div className={styles.image}>
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt="user avatar"
                  fill
                  priority
                  draggable={false}
                />
              )
                : (
                  <Image
                    src={avatar}
                    alt="default avatar"
                    fill
                    priority
                    draggable={false}
                  />
                )}
            </div>
            <h2>{user.username}</h2>
            <MaterialIcon name="MdKeyboardArrowDown" />
          </>
        ) : (
          <>
            <div className={styles.image}>
              <Image
                src={avatar}
                alt="default avatar"
                fill
                priority
                draggable={false}
              />
            </div>
            <MaterialIcon name="MdKeyboardArrowDown" />
          </>
        )}
      </button>
      <div className={cn(styles.drop, { [styles.active]: activedrop === true })}>
        {user ? (
          <>
            {user?.isAdmin && (
              <Link
                href={getAdminHomeUrl()}
                className={styles.box}
              >
                <div>
                  <MaterialIcon name="MdDvr" />
                </div>
                <span>Администратор</span>
              </Link>
            )}
            <Link
              href="/profile"
              className={styles.box}
            >
              <div>
                <MaterialIcon name="MdSettings" />
              </div>
              <span>Профиль</span>
            </Link>
            <button
              type="button"
              onClick={() => handleLogout}
              className={styles.box}
            >
              <div>
                <MaterialIcon name="MdLogout" />
              </div>
              <span>Выйти</span>
            </button>

          </>
        ) : (
          <>
            <button
              type="button"
              className={styles.box}
              onClick={ShowLogin}
            >
              <div>
                <MaterialIcon name="MdLogin" />
              </div>
              <span>Войти</span>
            </button>
            <button
              type="button"
              className={styles.box}
              onClick={ShowRegistration}
            >
              <div>
                <MaterialIcon name="MdAppRegistration" />
              </div>
              <span> Регистрация</span>
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default LoginButton;
