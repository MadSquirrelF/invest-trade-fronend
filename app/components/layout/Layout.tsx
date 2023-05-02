import React, { FC } from 'react';

import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { setScrollPositon } from '@/store/scroll/slice';
import Up from '../ui/Up';
import styles from './Layout.module.scss';

import Sidebar from './Sidebar/Sidebar';

type Props = {
  children: React.ReactNode;
};

const DynamicHeader = dynamic(() => import(`./Navigation/Navigation`), { ssr: false });

const Layout: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  const handleScroll = () => {
    dispatch(setScrollPositon(window.scrollY));
  };
  const handleUpButton = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: `smooth`,
    });
  };

  React.useEffect(() => {
    window.addEventListener(`scroll`, handleScroll);

    return () => window.removeEventListener(`scroll`, handleScroll);
  }, []);

  return (
    <div className={styles.layout}>
      <DynamicHeader />

      <div className={styles.center}>
        {children}
      </div>
      <Up handleUpButton={handleUpButton} />
      <Sidebar />

    </div>
  );
};

export default Layout;
