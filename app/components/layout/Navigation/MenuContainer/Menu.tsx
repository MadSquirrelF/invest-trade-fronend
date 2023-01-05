import dynamic from 'next/dynamic'
import { FC } from 'react'
import { IMenu } from './menu.interface'
import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import cn from 'classnames'
import { selectModal } from '@/store/modal/modal.slice'
import { useSelector } from 'react-redux'

const Menu: FC<{ menu: IMenu }> = ({ menu: { items } }) => {
  const { nav } = useSelector(selectModal);
  return (
    <div className={cn(styles.menu, { [styles.active]: nav === true })}>
      <ul className={styles.ul}>
        {items.map(item => (
          <MenuItem item={item} key={item.link} />
        ))}
      </ul>
    </div>
  )
}

export default Menu