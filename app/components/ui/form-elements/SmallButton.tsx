import { FC } from 'react'
import { IButton } from './form.interface'
import styles from './form.module.scss'
import cn from 'classnames'

const SmallButton: FC<IButton> = ({ children, className, ...rest }) => {
  return (
    <button className={cn(styles.smallbutton, className)} {...rest}>
      {children}
    </button>)
}

export default SmallButton