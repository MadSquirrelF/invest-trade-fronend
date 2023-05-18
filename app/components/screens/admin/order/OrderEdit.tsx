import { FC } from 'react';

import { useDispatch } from 'react-redux';

import styles from './OrderEdit.module.scss';

const OrderEdit: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      OrderEdit
    </div>
  );
};

export default OrderEdit;
