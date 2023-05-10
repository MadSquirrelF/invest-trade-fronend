import { FC } from 'react';
import cn from 'classnames';
import styles from './Stepper.module.scss';
import MaterialIcon from '../MaterialIcon';
import { TypeMaterialIconName } from '@/shared/types/icons.types';

interface IStepper {
  id: number;
  title: string;
  icon: TypeMaterialIconName;
}

const steps: IStepper[] = [
  {
    id: 0,
    title: `Корзина`,
    icon: `MdShoppingBasket`,
  },
  {
    id: 1,
    title: `Контакты`,
    icon: `MdContactPage`,
  },
  {
    id: 2,
    title: `Доставка`,
    icon: `MdOutlineEditLocationAlt`,
  },
  {
    id: 3,
    title: `Способ оплаты`,
    icon: `MdPayment`,
  },
  {
    id: 4,
    title: `Данные заказа`,
    icon: `MdDocumentScanner`,
  },
];

const Stepper: FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className={styles.Stepper}>
    {
      steps.map((step) => (
        <div
          key={step.id}
          className={cn(styles.step, {
            [styles.active]: step.id === currentStep,
            [styles.complete]: step.id < currentStep,
          })}
        >
          <div className={styles.iconContainer}><MaterialIcon name={step.icon} /></div>
          <span className={styles.title}>{step.title}</span>
        </div>
      ))
    }
  </div>
);

export default Stepper;
