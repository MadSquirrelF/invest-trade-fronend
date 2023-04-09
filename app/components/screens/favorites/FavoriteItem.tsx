import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Favorites.module.scss'
import { IFavoriteItem } from './favorites.interface'
import FavoriteButton from '@/components/ui/Shop/FavoriteButton/FavoriteButton'
import MaterialIcon from '@/components/ui/MaterialIcon'

const FavoriteItem: FC<{ item: IFavoriteItem }> = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.imgContainer}>
        <Image src={item.image} alt={item.name} draggable={false} height={80} width={80}/>
      </div>
      <div className={styles.info}>
        <h3>{item.name}</h3>
        <p>Категория: <b>{item.category}</b>, Производство: <b>{item.brand}</b> </p>
      </div>
      <div className={styles.buttons}>
        <FavoriteButton productId={item._id}/>
        <Link href={item.url} className={styles.option}><MaterialIcon name='MdVisibility' /></Link>
        <div className={styles.option}><MaterialIcon name='MdAddShoppingCart' /></div>
      </div>
    </div>
  )
}

export default FavoriteItem
