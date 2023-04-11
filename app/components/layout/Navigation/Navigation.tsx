import LoginModal from '@/components/ui/Auth/LoginModal'
import RegistrationModal from '@/components/ui/Auth/RegistrationModal'
import MaterialIcon from '@/components/ui/MaterialIcon'
import Modal from '@/components/ui/Modal/Modal'
import { selectModal, setNav } from '@/store/modal/modal.slice'
import Link from 'next/link'
import { FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Logo from './Logo'
import MenuContainer from './MenuContainer/MenuContainer'
import cn from 'classnames'
import styles from './Navigation.module.scss'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { setScroll } from '@/store/scroll/slice'
import { useFavorites } from '@/components/screens/favorites/useFavorites'
import SocialBox from './SocialBox/SocialBox'
import ContactBox from './ContactBox/ContactBox'
import { selectCart } from '@/store/cart/selectors'
import { CartItem } from '@/store/cart/types'




const DynamicLogin = dynamic(() => import('./MenuContainer/Login/LoginButton'), { ssr: false })

const Navigation: FC = () => {
  const dispatch = useDispatch()
  const { pathname } = useRouter()
  const { type } = useSelector(selectModal);
  const { scrollPosition } = useSelector(setScroll);
  const isMounted = useRef(false);
  const { favoritesProducts } = useFavorites()

  const { items } = useSelector(selectCart);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  const totalCount = items.reduce((sum: number, item: CartItem) => sum + item.count, 0);
  return (
    <section className={cn(styles.header, { [styles.black]: scrollPosition > 50, [styles.blue]: scrollPosition > 700, [styles.blueGradientHome]: pathname !== '/', [styles.blueGradient]: scrollPosition > 3000 })}>
      <div className={styles.Topcontainer}>
        <Logo />
        <SocialBox />
        <ContactBox />
        <DynamicLogin />
        <Modal>{type === 'login' ? (<LoginModal />) : (<RegistrationModal />)}</Modal>
      </div>
      <hr />
      <div className={styles.Bottomcontainer}>
        <MenuContainer />
        <div className={styles.menutoogle} onClick={() => dispatch(setNav(true))}  >
          <MaterialIcon name='MdOutlineMenu' />
        </div>
        <div className={styles.ButtonContainer}>
          <div className={styles.headerFavorites}>
            <Link href="/favorites">
              <MaterialIcon name='MdFavorite' />
              <div className={styles.CountMessage}>
                <span>{favoritesProducts ? favoritesProducts.length : 0}</span>
              </div>
            </Link>

          </div>
          <div className={styles.headerCart}>
            <Link href="/cart" className={styles.CartButton}>
              <span>Корзина</span>
              <div className={styles.delimeter}></div>
              <svg className={styles.arrow} width="20" height="14" viewBox="0 0 10 8" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.995605 3.3125C0.719463 3.3125 0.495605 3.53636 0.495605 3.8125C0.495605 4.08864 0.719463 4.3125 0.995605 4.3125V3.3125ZM9.38258 4.16605C9.57784 3.97079 9.57784 3.65421 9.38258 3.45895L6.2006 0.276966C6.00533 0.0817039 5.68875 0.0817039 5.49349 0.276966C5.29823 0.472228 5.29823 0.788811 5.49349 0.984073L8.32192 3.8125L5.49349 6.64093C5.29823 6.83619 5.29823 7.15277 5.49349 7.34803C5.68875 7.5433 6.00533 7.5433 6.2006 7.34803L9.38258 4.16605ZM0.995605 4.3125H9.02902V3.3125H0.995605V4.3125Z" fill="blue" />
              </svg>
              <div className={styles.TotalCount}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="blue"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="blue"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="blue"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{totalCount}</span>
              </div>
            </Link>
          </div>
        </div>

      </div>




    </section>
  )
}

export default Navigation