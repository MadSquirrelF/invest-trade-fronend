import { useRouter } from 'next/router'
import { FC } from 'react'
import { IMenuItem } from './menu.interface'
import cn from 'classnames'
import styles from './Menu.module.scss'
import Link from 'next/link'


const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const { asPath } = useRouter()

  return (<li className={cn({
    [styles.active]: asPath === item.link || asPath === item.path
  })}>
    <Link className={styles.item} href={item.link}>
      <span>{item.title}</span>
    </Link>
  </li>)
}

export default MenuItem