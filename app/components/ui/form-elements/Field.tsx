import { forwardRef } from 'react';
import cn from 'classnames';
import { IField } from './form.interface';
import styles from './form.module.scss';

const Field = forwardRef<HTMLInputElement, IField>(
  ({
    placeholder, error, type, style, ...rest
  }, ref) => (
    <div
      className={cn(styles.common, styles.field)}
      style={style}
    >
      <label>{placeholder}</label>
      <input
        ref={ref}
        type={type}
        {...rest}
      />
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  ),
);

Field.displayName = `Field`;

export default Field;
