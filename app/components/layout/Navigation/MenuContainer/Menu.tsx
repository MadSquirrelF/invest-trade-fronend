import dynamic from 'next/dynamic'
import { FC } from 'react'
import { IMenu } from './menu.interface'
import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import cn from 'classnames'
import { selectModal, setNav } from '@/store/modal/modal.slice'
import { useDispatch, useSelector } from 'react-redux'
import MaterialIcon from '@/components/ui/MaterialIcon'

const Menu: FC<{ menu: IMenu }> = ({ menu: { items } }) => {
  const { nav } = useSelector(selectModal);
  const dispatch = useDispatch()
  return (
    <div className={cn(styles.menu, { [styles.active]: nav === true })}>


      <ul className={styles.ul}>
        {items.map(item => (
          <MenuItem item={item} key={item.link} />
        ))}
      </ul>
      <button onClick={() => dispatch(setNav(false))}>
        <MaterialIcon name='MdClose' />
      </button>

    </div>
  )
}

export default Menu