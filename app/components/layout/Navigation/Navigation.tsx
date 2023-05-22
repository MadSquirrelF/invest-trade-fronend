import Link from 'next/link';
import {
  FC, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import LoginModal from '@/components/ui/Auth/LoginModal';
import RegistrationModal from '@/components/ui/Auth/RegistrationModal';
import MaterialIcon from '@/components/ui/MaterialIcon';
import Modal from '@/components/ui/Modal/Modal';
import { selectModal, setNav } from '@/store/modal/modal.slice';
import Logo from './Logo';
import MenuContainer from './MenuContainer/MenuContainer';
import styles from './Navigation.module.scss';
import { setScroll } from '@/store/scroll/slice';
import { useFavorites } from '@/components/screens/favorites/useFavorites';
import SocialBox from './SocialBox/SocialBox';
import ContactBox from './ContactBox/ContactBox';
import { selectCart } from '@/store/cart/selectors';
import { CartItemType } from '@/store/cart/types';

const DynamicLogin = dynamic(() => import(`./MenuContainer/Login/LoginButton`), { ssr: false });

const Navigation: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const { type } = useSelector(selectModal);
  const { scrollPosition } = useSelector(setScroll);
  const isMounted = useRef(false);
  const { favoritesProducts } = useFavorites();

  const { items } = useSelector(selectCart);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem(`cart`, json);
    }
    isMounted.current = true;
  }, [items]);

  const totalCount = items.reduce((sum: number, item: CartItemType) => sum + item.count, 0);

  return (
    <section className={cn(styles.header, {
      [styles.black]: scrollPosition > 50,
      [styles.blue]: scrollPosition > 700,
      [styles.blueGradientHome]: pathname !== `/`,
      [styles.blueGradient]: scrollPosition > 3000,
    })}
    >
      <div
        className={styles.Topcontainer}

      >
        <div className={styles.logoContainer}>
          <Logo />
          <DynamicLogin />
        </div>

        <div
          className={styles.contactContainer}
        >
          <SocialBox />
          <ContactBox />
        </div>

        <Modal>{type === `login` ? (<LoginModal />) : (<RegistrationModal />)}</Modal>
      </div>
      <hr />
      <div
        className={styles.Bottomcontainer}
      >
        <MenuContainer />
        <button
          type="button"
          className={styles.menutoogle}
          onClick={() => dispatch(setNav(true))}
        >
          <MaterialIcon name="MdOutlineMenu" />
        </button>
        <div className={styles.ButtonContainer}>
          <div className={styles.headerFavorites}>
            <Link href="/favorites">
              <MaterialIcon name="MdFavorite" />
              <div className={styles.CountMessage}>
                <span>{favoritesProducts ? favoritesProducts.length : 0}</span>
              </div>
            </Link>

          </div>
          <div className={styles.headerCart}>
            <Link
              href="/cart"
              className={styles.CartButton}
            >
              <span>Корзина</span>
              <div className={styles.delimeter} />
              <svg
                className={styles.arrow}
                width="20"
                height="14"
                viewBox="0 0 10 8"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.995605 3.3125C0.719463 3.3125 0.495605
                   3.53636 0.495605 3.8125C0.495605 4.08864 0.719463
                    4.3125 0.995605 4.3125V3.3125ZM9.38258
                     4.16605C9.57784 3.97079 9.57784 3.65421
                      9.38258 3.45895L6.2006 0.276966C6.00533 0.0817039 5.68875 0.0817039 5.49349 0.276966C5.29823
                       0.472228 5.29823 0.788811 5.49349 0.984073L8.32192 3.8125L5.49349 6.64093C5.29823 6.83619 5.29823
                        7.15277 5.49349 7.34803C5.68875 7.5433 6.00533 7.5433 6.2006 7.34803L9.38258 4.16605ZM0.995605 4.3125H9.02902V3.3125H0.995605V4.3125Z"
                  fill="blue"
                />
              </svg>
              <div className={styles.TotalCount}>
                <MaterialIcon name="MdShoppingCart" />
                <span>{totalCount}</span>
              </div>
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Navigation;
