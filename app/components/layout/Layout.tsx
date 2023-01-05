import { setScrollPositon } from '@/store/scroll/slice';
import { useRouter } from 'next/router';
import React from 'react';
import { FC } from 'react'
import { useDispatch } from 'react-redux';
import Up from '../ui/Up';
import styles from './Layout.module.scss'
import Navigation from './Navigation/Navigation'
import Sidebar from './Sidebar/Sidebar';

type Props = {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {



  const dispatch = useDispatch()

  const handleScroll = () => {
    dispatch(setScrollPositon(window.scrollY))
  };
  const handleUpButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.layout}>
      <Navigation />

      <div className={styles.center}>
        {children}
      </div>
      <Up handleUpButton={handleUpButton} />
      <Sidebar />

    </div>
  )
}

export default Layout