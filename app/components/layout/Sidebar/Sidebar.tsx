import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import styles from './Sidebar.module.scss';
import Button from '@/components/ui/form-elements/Button';

const Sidebar: FC = () => {
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    const popStatus = localStorage.getItem(`pop_status`);
    if (popStatus !== `1`) {
      setShowCookie(true);
      localStorage.setItem(`pop_status`, `1`);
    }
  }, []);

  return (
    <CSSTransition
      in={showCookie}
      classNames="slide-animation"
      timeout={300}
      unmountOnExit
    >
      <div className={styles.sidebar}>
        <div className={styles.container}>
          {/* <div className={styles.image}>
            <Image src={cookie} alt={'cookie image'} draggable={false} fill />
          </div> */}
          <div className={styles.text}>
            <h1>МЫ ИСПОЛЬЗУЕМ COOKIE 🍪</h1>
            <p>
              Мы используем cookies для быстрой и удобной работы сайта. Продолжая использовать наш сайт, вы даете согласие на обработку файлов cookie и
              {` `}
              <Link href="/404">принимаете условия обработки персональных данных</Link>
              .
              Если вы не хотите, чтобы ваши данные обрабатывались, покиньте сайт.

            </p>
          </div>
          <Button onClick={() => setShowCookie(false)}>ОК</Button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Sidebar;
