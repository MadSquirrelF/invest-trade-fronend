
import { setScroll } from '@/store/scroll/slice';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import styles from './Up.module.scss';



const Up: FC<{ handleUpButton: () => void }> = ({ handleUpButton }) => {

  const { scrollPosition } = useSelector(setScroll);

  return (
    <div className={scrollPosition < 300 ? styles.root : styles.show}
      onClick={() => handleUpButton()}>
      <span>🚀</span>
    </div>
  )
}

export default Up;