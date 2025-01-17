/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, selectModal } from '@/store/modal/modal.slice';

import styles from './Modal.module.scss';

type Props = {
  children: React.ReactNode;
};

const Modal: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const { modal } = useSelector(selectModal);
  return (
    <div
      className={modal ? styles.rootActive : styles.root}
      onClick={() => dispatch(hideModal())}
    >
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        <span onClick={() => dispatch(hideModal())}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.0205 19.9149L34.0767 9.79946C34.5728 9.25558
               34.8408 8.54 34.8249 7.80208C34.809 7.06416 34.5104
                6.36094 33.9914 5.8392C33.4724 5.31746 32.7731 5.01752 32.0395
                 5.002C31.3059 4.98648 30.5946 5.25657 30.0543 5.7559L30.0569
                  5.75328L20.0007 15.8687L9.94449 5.75328C9.40379 5.2543 8.6924 4.98467
                   7.95881 5.00067C7.22521 5.01667 6.52611 5.31706 6.00743 5.83914C5.48874
                    6.36122 5.19057 7.06464 5.17514 7.80257C5.15971 8.5405 5.42822 9.2559
                     5.92462 9.79946L5.92201 9.79683L15.9782 19.9123L5.92201 30.0277C5.63907
                      30.2889 5.41159 30.6048 5.25325 30.9567C5.09491 31.3086 5.00899 31.689
                       5.00067 32.0752C4.99235 32.4613 5.06179 32.8452 5.20482 33.2036C5.34784
                        33.562 5.5615 33.8877 5.83292 34.1609C6.10434 34.4341 6.42791 34.6492
                         6.78416 34.7933C7.1404 34.9374 7.52195 35.0075 7.90584 34.9994C8.28973
                          34.9912 8.66801 34.9051 9.01792 34.746C9.36782 34.587 9.68212
                           34.3584 9.94188 34.0739L9.94449 34.0713L20.0007 23.9558L30.0569
                            34.0713C30.3165 34.3559 30.6306 34.5847 30.9804 34.744C31.3302
                             34.9033 31.7084 34.9897 32.0923 34.9981C32.4762 35.0064 32.8578
                              34.9366 33.2141 34.7927C33.5705 34.6489 33.8942 34.4339 34.1658
                               34.1609C34.4374 33.8879 34.6512 33.5624 34.7945 33.2041C34.9378
                                32.8457 35.0074 32.4619 34.9994 32.0758C34.9913 31.6896 34.9056
                                 31.3091 34.7475 30.9571C34.5894 30.6052 34.3621 30.289 34.0794 30.0277L34.0767 30.0251L24.0205 19.9149Z"
              fill="white"
            />
          </svg>
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
