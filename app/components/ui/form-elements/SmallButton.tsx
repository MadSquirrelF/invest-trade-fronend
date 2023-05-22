import { FC } from 'react';
import cn from 'classnames';
import { IButton } from './form.interface';
import styles from './form.module.scss';

const SmallButton: FC<IButton> = ({ children, className, ...rest }) => (
  <button
    type="button"
    className={cn(styles.smallbutton, className)}
    {...rest}
  >
    {children}
  </button>
);

export default SmallButton;
