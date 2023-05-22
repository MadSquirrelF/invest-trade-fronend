import { FC } from 'react';
import cn from 'classnames';
import { IButton } from './form.interface';

import styles from './form.module.scss';

const Button: FC<IButton> = ({ children, className, ...rest }) => (
  // eslint-disable-next-line react/button-has-type
  <button
    className={cn(styles.button, className)}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
