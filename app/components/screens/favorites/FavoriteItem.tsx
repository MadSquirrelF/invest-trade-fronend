import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Favorites.module.scss'
import { IFavoriteItem } from './favorites.interface'
import FavoriteButton from '@/components/ui/Shop/FavoriteButton/FavoriteButton'

const FavoriteItem: FC<{ item: IFavoriteItem }> = ({ item }) => {
  return (
    <div className={styles.itemWrapper}>
      <FavoriteButton productId={item._id} />
      <Link href={item.url}>
        <div className={styles.item}>
          <Image
            alt={item.name}
            src={item.posterPath}
            height={30}
            width={30}
            draggable={false}
            priority
          />

          <div className={styles.title}>{item.title}</div>
        </div>
      </Link>
    </div>
  )
}

export default FavoriteItem
