import { useRouter } from 'next/router'
import { FC } from 'react'
import { IMenuItem } from './menu.interface'
import cn from 'classnames'
import styles from './Menu.module.scss'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setNav } from '@/store/modal/modal.slice'
import MaterialIcon from '@/components/ui/MaterialIcon'


const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const { asPath } = useRouter()
  const dispatch = useDispatch()
  return (<li className={cn({
    [styles.active]: asPath === item.link || asPath === item.path
  })}>
    <Link className={styles.item} href={item.link} onClick={() => dispatch(setNav(false))}>
      <MaterialIcon name={item.icon} />
      <span>{item.title}</span>
    </Link>
  </li>)
}

export default MenuItem