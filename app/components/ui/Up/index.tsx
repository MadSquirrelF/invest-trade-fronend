import { FC } from 'react';
import { useSelector } from 'react-redux';
import { setScroll } from '@/store/scroll/slice';
import styles from './Up.module.scss';

const Up: FC<{ handleUpButton: () => void }> = ({ handleUpButton }) => {
  const { scrollPosition } = useSelector(setScroll);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={scrollPosition < 300 ? styles.root : styles.show}
      onClick={() => handleUpButton()}
    >
      <span>🚀</span>
    </div>
  );
};

export default Up;
